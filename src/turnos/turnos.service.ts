import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { QueryTurnosDto } from './dto/query-turnos.dto';

export interface PaginatedTurnos {
  data: Turno[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async findAll(query: QueryTurnosDto): Promise<PaginatedTurnos> {
    const { page = 1, limit = 20, fecha, medico_id, clinica_id, estado, paciente_nombre } = query;
    const skip = (page - 1) * limit;

    const qb: SelectQueryBuilder<Turno> = this.turnoRepository
      .createQueryBuilder('turno')
      .orderBy('turno.fecha', 'ASC')
      .addOrderBy('turno.hora_inicio', 'ASC');

    if (fecha) {
      qb.andWhere('turno.fecha = :fecha', { fecha });
    }

    if (medico_id) {
      qb.andWhere('turno.medico_id = :medico_id', { medico_id });
    }

    if (clinica_id) {
      qb.andWhere('turno.clinica_id = :clinica_id', { clinica_id });
    }

    if (estado) {
      qb.andWhere('turno.estado = :estado', { estado });
    }

    if (paciente_nombre) {
      qb.andWhere('LOWER(turno.paciente_nombre) LIKE LOWER(:paciente_nombre)', {
        paciente_nombre: `%${paciente_nombre}%`,
      });
    }

    const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
}
