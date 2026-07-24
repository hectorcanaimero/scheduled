export default function LoadingAppointment() {
  return (
    <main className="appointment-page">
      <section className="content" aria-busy="true" aria-label="Cargando turno">
        <div className="skeleton skeleton-copy" />
        <div className="appointment-card skeleton-card">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-details" />
        </div>
      </section>
    </main>
  );
}
