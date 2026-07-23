export type EstadoTurno = 'pendiente' | 'confirmado' | 'cancelado' | 'completado';

export class TurnoDto {
  id: string;
  profesional_id: string;
  paciente_nombre: string;
  paciente_telefono: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: EstadoTurno;
  notas?: string;
}

export class AgendaResponseDto {
  profesional_id: string;
  turnos: TurnoDto[];
}
