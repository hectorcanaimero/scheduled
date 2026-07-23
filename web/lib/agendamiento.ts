import { z } from "zod";

const AgendamientoSchema = z.object({
  link_token: z.string().min(1),
  profesional: z.object({
    nombre: z.string().min(1),
    especialidad: z.string().min(1),
  }),
  disponibilidad: z.object({
    fecha: z.string().min(1),
    horario: z.string().min(1),
  }),
  valor: z.number().nonnegative(),
  estado: z.enum(["pendiente", "confirmado", "cancelado"]),
  paciente_nombre: z.string().min(1),
});

export type Agendamiento = z.infer<typeof AgendamientoSchema>;

export class AgendamientoNotFoundError extends Error {}

export async function getAgendamiento(token: string): Promise<Agendamiento> {
  const apiUrl = process.env.API_URL ?? "http://localhost:3000";
  const response = await fetch(
    `${apiUrl}/agendamiento/${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    throw new AgendamientoNotFoundError("El enlace no existe o ya venció.");
  }

  if (!response.ok) {
    throw new Error(`No se pudo cargar el agendamiento (${response.status}).`);
  }

  return AgendamientoSchema.parse(await response.json());
}
