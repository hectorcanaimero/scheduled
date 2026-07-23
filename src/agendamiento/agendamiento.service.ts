import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Turno } from '../turno/entities/turno.entity';
import { AgendamientoDetalleDto } from './dto/agendamiento-detalle.dto';
import { ConfirmarAgendamientoDto } from './dto/confirmar-agendamiento.dto';
import { Agendamiento, EstadoAgendamiento } from './entities/agendamiento.entity';
import { BloqueoHorario } from './entities/bloqueo-horario.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepo: Repository<Agendamiento>,
    @InjectRepository(BloqueoHorario)
    private readonly bloqueoRepo: Repository<BloqueoHorario>,
    @InjectRepository(Turno)
    private readonly turnoRepo: Repository<Turno>,
    private readonly dataSource: DataSource,
  ) {}

  async findByLinkToken(link_token: string): Promise<AgendamientoDetalleDto> {
    const turno = await this.turnoRepo.findOne({
      where: { link_token },
      relations: ['profesional', 'disponibilidad', 'paciente'],
    });

    if (!turno) {
      throw new NotFoundException(
        `Agendamiento con token "${link_token}" no encontrado`,
      );
    }

    return {
      link_token: turno.link_token,
      profesional: {
        nombre: turno.profesional.nombre,
        especialidad: turno.profesional.especialidad,
      },
      disponibilidad: {
        fecha: turno.disponibilidad.fecha,
        horario: turno.disponibilidad.horario,
      },
      valor: Number(turno.valor),
      estado: turno.estado,
      paciente_nombre: turno.paciente.nombre,
    };
  }

  async confirmar(
    link_token: string,
    dto: ConfirmarAgendamientoDto,
  ): Promise<Agendamiento> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const agendamiento = await queryRunner.manager.findOne(Agendamiento, {
        where: { link_token },
        lock: { mode: 'pessimistic_write' },
      });

      if (!agendamiento) {
        throw new NotFoundException(
          `Agendamiento con token ${link_token} no encontrado`,
        );
      }

      if (agendamiento.estado === EstadoAgendamiento.CONFIRMADO) {
        throw new BadRequestException('El agendamiento ya fue confirmado');
      }

      if (agendamiento.estado === EstadoAgendamiento.CANCELADO) {
        throw new BadRequestException('El agendamiento fue cancelado');
      }

      const finHorario = new Date(agendamiento.fecha_hora);
      finHorario.setMinutes(
        finHorario.getMinutes() + agendamiento.duracion_minutos,
      );

      const conflicto = await queryRunner.manager
        .createQueryBuilder(BloqueoHorario, 'b')
        .where('b.clinica_id = :clinicaId', {
          clinicaId: agendamiento.clinica_id,
        })
        .andWhere('b.profesional_id = :profesionalId', {
          profesionalId: agendamiento.profesional_id,
        })
        .andWhere('b.agendamiento_id != :agendamientoId OR b.agendamiento_id IS NULL', {
          agendamientoId: agendamiento.id,
        })
        .andWhere('b.inicio < :fin AND b.fin > :inicio', {
          inicio: agendamiento.fecha_hora,
          fin: finHorario,
        })
        .getOne();

      if (conflicto) {
        throw new ConflictException(
          'El horario seleccionado ya no está disponible',
        );
      }

      agendamiento.estado = EstadoAgendamiento.CONFIRMADO;
      agendamiento.confirmado_en = new Date();
      agendamiento.confirmado_por = dto.confirmado_por ?? 'paciente';

      const saved = await queryRunner.manager.save(Agendamiento, agendamiento);

      const bloqueo = queryRunner.manager.create(BloqueoHorario, {
        clinica_id: agendamiento.clinica_id,
        profesional_id: agendamiento.profesional_id,
        inicio: agendamiento.fecha_hora,
        fin: finHorario,
        agendamiento_id: agendamiento.id,
        motivo: 'confirmacion',
      });

      await queryRunner.manager.save(BloqueoHorario, bloqueo);

      await queryRunner.commitTransaction();

      return saved;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
