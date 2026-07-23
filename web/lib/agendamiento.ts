import { z } from "zod";

const estadoSchema = z.enum(["pendiente", "confirmado", "cancelado"]);

const agendamientoSchema = z.object({
  link_token: z.string().min(1),
  profesional: z.object({
    nombre: z.string().min(1),
    especialidad: z.string().min(1),
  }),
  disponibilidad: z.object({
    fecha: z.string().min(1),
    horario: z.string().min(1),
  }),
  valor: z.coerce.number().nonnegative(),
  estado: estadoSchema,
  paciente_nombre: z.string().min(1).optional(),
});

export type Agendamiento = z.infer<typeof agendamientoSchema>;

type ApiErrorPayload = { message?: string | string[] };

function errorMessage(payload: ApiErrorPayload, fallback: string) {
  if (Array.isArray(payload.message)) return payload.message.join(" ");
  return payload.message ?? fallback;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function getAgendamiento(token: string, signal?: AbortSignal): Promise<Agendamiento> {
  const response = await fetch(`${API_URL}/agendamiento/${encodeURIComponent(token)}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  const payload: unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(errorMessage(payload as ApiErrorPayload, "No pudimos encontrar esta reserva."));
  }

  return agendamientoSchema.parse(payload);
}

export async function confirmarAgendamiento(token: string): Promise<void> {
  const response = await fetch(`${API_URL}/agendamiento/${encodeURIComponent(token)}/confirmar`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ confirmado_por: "paciente" }),
  });

  const payload: unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(errorMessage(payload as ApiErrorPayload, "No pudimos confirmar el turno."));
  }
}
