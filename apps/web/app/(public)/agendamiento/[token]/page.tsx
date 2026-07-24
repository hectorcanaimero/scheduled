import { notFound } from "next/navigation";
import { AppointmentCard } from "@/components/appointment-card";
import {
  AgendamientoNotFoundError,
  getAgendamiento,
} from "@/lib/agendamiento";

export default async function AppointmentPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  try {
    const appointment = await getAgendamiento(token);

    return (
      <main className="appointment-page">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <section className="content">
          <header className="page-header">
            <p className="brand">
              <span aria-hidden="true">+</span> cuidado
            </p>
            <p className="kicker">Tu próxima consulta</p>
            <h1>
              Todo listo para
              <br />
              <em>tu encuentro.</em>
            </h1>
            <p className="intro">
              Revisá con calma los datos de la consulta que recibiste por
              WhatsApp.
            </p>
          </header>

          <AppointmentCard appointment={appointment} />

          <p className="privacy-note">
            Este enlace es personal. No lo compartas con otras personas.
          </p>
        </section>
      </main>
    );
  } catch (error) {
    if (error instanceof AgendamientoNotFoundError) notFound();
    throw error;
  }
}
