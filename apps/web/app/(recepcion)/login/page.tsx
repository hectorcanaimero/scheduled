import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="story-panel" aria-label="Bienvenida">
        <div className="story-content">
          <a className="brand" href="/login" aria-label="Clara, inicio">
            <span className="brand-mark" aria-hidden="true">
              C
            </span>
            <span>clara</span>
          </a>

          <div className="story-copy">
            <p className="eyebrow">Recepción en calma</p>
            <h1>Cuidar la agenda también es cuidar a las personas.</h1>
            <p>
              Turnos, pacientes y profesionales reunidos en un espacio claro,
              para que cada jornada empiece con todo en su lugar.
            </p>
          </div>

          <div className="day-note">
            <span className="pulse" aria-hidden="true" />
            <span>Tu clínica, siempre al día</span>
          </div>
        </div>
        <div className="botanical botanical-one" aria-hidden="true" />
        <div className="botanical botanical-two" aria-hidden="true" />
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-brand" aria-hidden="true">
            <span className="brand-mark">C</span>
            <span>clara</span>
          </div>
          <p className="eyebrow">Panel de recepción</p>
          <h2>Qué bueno verte</h2>
          <p className="form-intro">
            Ingresá con los datos asociados a tu clínica.
          </p>
          <LoginForm />
          <p className="privacy-note">
            Acceso privado y protegido para el equipo de recepción.
          </p>
        </div>
      </section>
    </main>
  );
}
