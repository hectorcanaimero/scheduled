import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Stethoscope,
  WalletCards,
} from "lucide-react";
import type { Agendamiento } from "@/lib/agendamiento";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const moneyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

function formatTime(value: string): string {
  return value.slice(0, 5);
}

export function AppointmentCard({
  appointment,
}: {
  appointment: Agendamiento;
}) {
  const isConfirmed = appointment.estado === "confirmado";

  return (
    <article className="appointment-card">
      <div className="card-topline">
        <span className={`status ${isConfirmed ? "status-confirmed" : ""}`}>
          {isConfirmed ? <CheckCircle2 aria-hidden="true" /> : null}
          {isConfirmed ? "Turno confirmado" : "Pendiente de confirmación"}
        </span>
        <span className="reference">
          Ref. {appointment.link_token.slice(0, 6).toUpperCase()}
        </span>
      </div>

      <div className="doctor">
        <span className="doctor-icon" aria-hidden="true">
          <Stethoscope />
        </span>
        <div>
          <p className="eyebrow">Profesional</p>
          <h2>{appointment.profesional.nombre}</h2>
          <p className="specialty">{appointment.profesional.especialidad}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail detail-date">
          <CalendarDays aria-hidden="true" />
          <div>
            <span>Fecha</span>
            <strong>{formatDate(appointment.disponibilidad.fecha)}</strong>
          </div>
        </div>
        <div className="detail">
          <Clock3 aria-hidden="true" />
          <div>
            <span>Horario</span>
            <strong>{formatTime(appointment.disponibilidad.horario)} h</strong>
          </div>
        </div>
        <div className="detail">
          <WalletCards aria-hidden="true" />
          <div>
            <span>Valor de consulta</span>
            <strong>{moneyFormatter.format(appointment.valor)}</strong>
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <span aria-hidden="true">✦</span>
        <p>
          Reserva a nombre de <strong>{appointment.paciente_nombre}</strong>
        </p>
      </footer>
    </article>
  );
}
