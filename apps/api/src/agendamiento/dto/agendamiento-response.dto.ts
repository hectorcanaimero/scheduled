import { EstadoAgendamiento } from '../entities/agendamiento.entity';

export class AgendamientoResponseDto {
  id: string;
  link_token: string;
  paciente_nombre: string;
  paciente_telefono: string;
  clinica_id: string;
  profesional_id: string;
  fecha_hora: Date;
  duracion_minutos: number;
  estado: EstadoAgendamiento;
  confirmado_por: string;
  confirmado_en: Date;
  created_at: Date;
}
