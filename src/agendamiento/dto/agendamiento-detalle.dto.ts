export class AgendamientoDetalleDto {
  link_token: string;
  profesional: {
    nombre: string;
    especialidad: string;
  };
  disponibilidad: {
    fecha: string;
    horario: string;
  };
  valor: number;
  estado: string;
  paciente_nombre: string;
}
