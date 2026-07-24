import { Link2Off } from "lucide-react";

export default function AppointmentNotFound() {
  return (
    <main className="appointment-page">
      <section className="empty-state">
        <span className="empty-icon">
          <Link2Off aria-hidden="true" />
        </span>
        <p className="kicker">Enlace no disponible</p>
        <h1>Este turno no se pudo encontrar.</h1>
        <p>
          Es posible que el enlace haya vencido. Pedile uno nuevo a la clínica
          por WhatsApp.
        </p>
      </section>
    </main>
  );
}
