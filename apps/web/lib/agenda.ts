import { z } from "zod";

const TurnoSchema = z.object({
  id: z.string(),
  profesional_id: z.string(),
  paciente_nombre: z.string(),
  fecha: z.string(),
  hora_inicio: z.string(),
  hora_fin: z.string(),
  estado: z.enum(["pendiente", "confirmado", "cancelado", "completado"]),
});

const AgendaSchema = z.object({
  profesional_id: z.string(),
  profesional_nombre: z.string().optional(),
  especialidad: z.string().optional(),
  clinica_nombre: z.string().optional(),
  turnos: z.array(TurnoSchema),
});

export type Agenda = z.infer<typeof AgendaSchema>;
export type Turno = z.infer<typeof TurnoSchema>;

export async function getAgenda(token: string): Promise<Agenda> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  const response = await fetch(`${apiUrl}/agenda/${encodeURIComponent(token)}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar la agenda (${response.status})`);
  }

  return AgendaSchema.parse(await response.json());
}
