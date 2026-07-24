import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Agendamiento } from '../agendamiento/entities/agendamiento.entity';
import { QueryTurnosDto } from './dto/query-turnos.dto';

export interface TurnoItem {
  id: string;
  fecha_hora: Date;
  duracion_minutos: number;
  estado: string;
  paciente_nombre: string;
  paciente_telefono: string;
  profesional_id: string;
  clinica_id: string;
  link_token: string;
  confirmado_por: string | null;
  confirmado_en: Date | null;
  created_at: Date;
}

export interface PaginatedTurnos {
  data: TurnoItem[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepo: Repository<Agendamiento>,
  ) {}

  async findAll(query: QueryTurnosDto): Promise<PaginatedTurnos> {
    const { page = 1, limit = 20, fecha, clinica_id, profesional_id, estado, paciente_nombre } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (fecha) {
      const inicio = new Date(`${fecha}T00:00:00.000Z`);
      const fin = new Date(`${fecha}T23:59:59.999Z`);
      where.fecha_hora = Between(inicio, fin);
    }

    if (clinica_id) {
      where.clinica_id = clinica_id;
    }

    if (profesional_id) {
      where.profesional_id = profesional_id;
    }

    if (estado) {
      where.estado = estado;
    }

    if (paciente_nombre) {
      where.paciente_nombre = ILike(`%${paciente_nombre}%`);
    }

    const [data, total] = await this.agendamientoRepo.findAndCount({
      where,
      order: { fecha_hora: 'ASC' },
      skip,
      take: limit,
    });

    return {
      data: data as unknown as TurnoItem[],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
}
