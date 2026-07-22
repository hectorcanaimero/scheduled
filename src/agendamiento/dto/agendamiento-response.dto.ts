import { AgendamientoStatus } from '../entities/agendamiento.entity';

export class AgendamientoResponseDto {
  id: string;
  link_token: string;
  paciente_nombre: string;
  paciente_telefono: string;
  clinica_nombre: string;
  clinica_direccion: string;
  especialista_nombre: string;
  especialidad: string;
  fecha_hora: Date;
  duracion_minutos: number;
  notas: string;
  status: AgendamientoStatus;
  created_at: Date;
}
