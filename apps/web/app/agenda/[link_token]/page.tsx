import { CalendarDays, CheckCircle2, Clock3, LockKeyhole, UserRound } from "lucide-react";
import { getAgenda, type Turno } from "@/lib/agenda";

type PageProps = { params: { link_token: string } };

const dayFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function dateKey(turno: Turno) {
  return turno.fecha.slice(0, 10);
}

function formatTime(value: string) {
  return value.slice(0, 5);
}

export default async function AgendaPage({ params }: PageProps) {
  const { link_token: token } = params;
  const agenda = await getAgenda(token);
  const active = agenda.turnos
    .filter((turno) => turno.estado !== "cancelado")
    .sort((a, b) => `${a.fecha}${a.hora_inicio}`.localeCompare(`${b.fecha}${b.hora_inicio}`));
  const grouped = active.reduce<Record<string, Turno[]>>((groups, turno) => {
    const key = dateKey(turno);
    return { ...groups, [key]: [...(groups[key] ?? []), turno] };
  }, {});

  return (
    <main className="mx-auto min-h-screen max-w-[1120px] px-5 py-6 md:px-10 md:py-10">
      <header className="flex items-center justify-between border-b border-[var(--line)] pb-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[var(--ink)] text-[var(--card)]">
            <CalendarDays aria-hidden="true" size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[var(--muted)]">
              {agenda.clinica_nombre ?? "Agenda clínica"}
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">Mi agenda</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
          <LockKeyhole aria-hidden="true" size={14} />
          Acceso privado
        </div>
      </header>

      <section className="grid gap-8 py-10 md:grid-cols-[.8fr_1.7fr] md:gap-16 md:py-16">
        <aside>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[var(--accent)]">Solo lectura</p>
          <h1 className="max-w-md font-[family-name:var(--font-display)] text-5xl leading-[.96] tracking-[-.045em] md:text-7xl">
            Tu semana, de un vistazo.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-[var(--muted)]">
            {agenda.profesional_nombre ?? "Profesional"}
            {agenda.especialidad ? ` · ${agenda.especialidad}` : ""}. Tus citas confirmadas y
            pendientes, organizadas por día.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/55 px-4 py-2.5 text-sm">
            <CheckCircle2 className="text-emerald-700" size={17} />
            <strong>{active.length}</strong>
            <span className="text-[var(--muted)]">{active.length === 1 ? "cita próxima" : "citas próximas"}</span>
          </div>
        </aside>

        <div className="space-y-9">
          {Object.entries(grouped).map(([date, appointments]) => (
            <section key={date} aria-labelledby={`day-${date}`}>
              <div className="mb-3 flex items-baseline justify-between border-b border-[var(--ink)] pb-2">
                <h2 id={`day-${date}`} className="font-[family-name:var(--font-display)] text-2xl capitalize">
                  {dayFormatter.format(new Date(`${date}T12:00:00`))}
                </h2>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                  {appointments.length} {appointments.length === 1 ? "turno" : "turnos"}
                </span>
              </div>
              <ol className="space-y-2">
                {appointments.map((turno) => (
                  <li key={turno.id} className="group grid grid-cols-[5.2rem_1fr_auto] items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-[0_8px_30px_rgba(23,53,47,.045)] transition-transform hover:-translate-y-0.5 md:grid-cols-[7rem_1fr_auto] md:p-5">
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                        {formatTime(turno.hora_inicio)}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[var(--muted)]">
                        <Clock3 aria-hidden="true" size={11} />
                        hasta {formatTime(turno.hora_fin)}
                      </p>
                    </div>
                    <div className="border-l border-[var(--line)] pl-4">
                      <p className="flex items-center gap-2 font-semibold">
                        <UserRound aria-hidden="true" className="text-[var(--muted)]" size={16} />
                        {turno.paciente_nombre}
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      turno.estado === "confirmado"
                        ? "bg-[var(--sage)] text-emerald-900"
                        : turno.estado === "completado"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-amber-100 text-amber-900"
                    }`}>
                      {turno.estado}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {active.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-[var(--line)] bg-white/40 px-8 py-16 text-center">
              <CalendarDays className="mx-auto mb-4 text-[var(--muted)]" size={32} strokeWidth={1.4} />
              <h2 className="font-[family-name:var(--font-display)] text-2xl">Tu agenda está despejada</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">No hay citas próximas para mostrar.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[var(--line)] py-5 text-xs leading-5 text-[var(--muted)]">
        Este enlace permite consultar la agenda, pero no modificarla. No lo compartas.
      </footer>
    </main>
  );
}
