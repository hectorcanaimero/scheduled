import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendamientoResponseDto } from './dto/agendamiento-response.dto';
import { Agendamiento } from './entities/agendamiento.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,
  ) {}

  async findByLinkToken(link_token: string): Promise<AgendamientoResponseDto> {
    const agendamiento = await this.agendamientoRepository.findOne({
      where: { link_token },
    });

    if (!agendamiento) {
      throw new NotFoundException(
        `Agendamiento con token "${link_token}" no encontrado`,
      );
    }

    return {
      id: agendamiento.id,
      link_token: agendamiento.link_token,
      paciente_nombre: agendamiento.paciente_nombre,
      paciente_telefono: agendamiento.paciente_telefono,
      clinica_nombre: agendamiento.clinica_nombre,
      clinica_direccion: agendamiento.clinica_direccion,
      especialista_nombre: agendamiento.especialista_nombre,
      especialidad: agendamiento.especialidad,
      fecha_hora: agendamiento.fecha_hora,
      duracion_minutos: agendamiento.duracion_minutos,
      notas: agendamiento.notas,
      status: agendamiento.status,
      created_at: agendamiento.created_at,
    };
  }
}
