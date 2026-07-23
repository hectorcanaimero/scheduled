"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Check, CircleAlert, Clock3, LoaderCircle, MapPin, ShieldCheck, Stethoscope, WalletCards } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { confirmarAgendamiento, getAgendamiento, type Agendamiento } from "@/lib/agendamiento";

type ViewState =
  | { status: "loading" }
  | { status: "ready"; data: Agendamiento }
  | { status: "confirming"; data: Agendamiento }
  | { status: "success"; data: Agendamiento }
  | { status: "error"; message: string };

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Detail({ icon: Icon, eyebrow, children }: { icon: typeof CalendarDays; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 gap-3 border-b border-emerald-950/10 py-4 last:border-0">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><Icon className="size-[18px]" aria-hidden="true" /></span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stone-500">{eyebrow}</p>
        <div className="mt-0.5 truncate font-semibold text-emerald-950">{children}</div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const params = useParams<{ clinicaId: string }>();
  const token = searchParams.get("token");
  const [view, setView] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    if (!token) {
      setView({ status: "error", message: "Este enlace está incompleto. Volvé al mensaje de WhatsApp y abrilo nuevamente." });
      return;
    }

    const controller = new AbortController();
    getAgendamiento(token, controller.signal)
      .then((data) => setView(data.estado === "confirmado" ? { status: "success", data } : { status: "ready", data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setView({ status: "error", message: error instanceof Error ? error.message : "No pudimos cargar la reserva." });
      });
    return () => controller.abort();
  }, [token]);

  async function confirm() {
    if (!token || view.status !== "ready") return;
    const data = view.data;
    setView({ status: "confirming", data });
    try {
      await confirmarAgendamiento(token);
      setView({ status: "success", data: { ...data, estado: "confirmado" } });
    } catch (error) {
      setView({ status: "error", message: error instanceof Error ? error.message : "No pudimos confirmar el turno." });
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden px-4 py-6 sm:grid sm:place-items-center sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-12 size-64 rounded-full border border-emerald-900/10" />
      <div className="pointer-events-none absolute -right-20 bottom-10 size-52 rounded-full bg-[#f6b15f]/15 blur-2xl" />

      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: "easeOut" }} className="relative mx-auto w-full max-w-[920px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_30px_90px_-50px_rgba(4,55,43,.48)] backdrop-blur-xl">
        <div className="grid md:grid-cols-[.88fr_1.12fr]">
          <header className="relative overflow-hidden bg-emerald-950 px-7 py-8 text-white sm:px-10 sm:py-11">
            <div className="absolute -right-16 -top-16 size-52 rounded-full border border-white/10" />
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-emerald-200"><span className="size-2 rounded-full bg-[#f6b15f]" /> Reserva segura</p>
            <h1 className="font-display mt-12 max-w-xs text-4xl leading-[1.02] sm:text-5xl">Un momento para vos.</h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-100/75">Revisá los detalles. Tu horario se reserva definitivamente cuando confirmás.</p>
            <div className="mt-14 flex items-center gap-2 text-xs text-emerald-100/60"><ShieldCheck className="size-4" /> Enlace privado · Clínica {params.clinicaId.slice(0, 6)}</div>
          </header>

          <div className="min-h-[490px] p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {view.status === "loading" && <StateCard key="loading" icon={<LoaderCircle className="size-8 animate-spin" />} title="Buscando tu reserva" copy="Esto puede tomar unos segundos." />}
              {view.status === "error" && <StateCard key="error" icon={<CircleAlert className="size-8" />} title="No pudimos abrir el turno" copy={view.message} />}
              {(view.status === "ready" || view.status === "confirming") && (
                <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a25f21]">Tu próxima consulta</p>
                  <h2 className="font-display mt-2 text-3xl text-emerald-950">Todo listo para confirmar</h2>
                  <div className="mt-5 grid sm:grid-cols-2 sm:gap-x-6">
                    <Detail icon={Stethoscope} eyebrow="Profesional">{view.data.profesional.nombre}</Detail>
                    <Detail icon={MapPin} eyebrow="Especialidad">{view.data.profesional.especialidad}</Detail>
                    <Detail icon={CalendarDays} eyebrow="Fecha">{capitalize(dateFormatter.format(new Date(`${view.data.disponibilidad.fecha}T00:00:00Z`)))}</Detail>
                    <Detail icon={Clock3} eyebrow="Horario">{view.data.disponibilidad.horario.slice(0, 5)} hs</Detail>
                    <Detail icon={WalletCards} eyebrow="Valor">{new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(view.data.valor)}</Detail>
                  </div>
                  <Button onClick={confirm} disabled={view.status === "confirming"} className="mt-6 w-full">
                    {view.status === "confirming" ? <><LoaderCircle className="size-5 animate-spin" /> Confirmando…</> : <>Confirmar mi turno <ArrowRight className="size-5" /></>}
                  </Button>
                  <p className="mt-4 text-center text-xs leading-5 text-stone-500">Al confirmar, este horario dejará de estar disponible para otras personas.</p>
                </motion.div>
              )}
              {view.status === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col justify-center text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 240, damping: 16 }} className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-900"><Check className="size-9" strokeWidth={3} /></motion.div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-[#a25f21]">Reserva confirmada</p>
                  <h2 className="font-display mt-2 text-4xl text-emerald-950">¡Te esperamos!</h2>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-stone-600">Tu turno con <strong>{view.data.profesional.nombre}</strong> quedó agendado. Podés cerrar esta ventana.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

function StateCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center text-emerald-900"><span className="grid size-16 place-items-center rounded-2xl bg-emerald-50">{icon}</span><h2 className="font-display mt-6 text-3xl">{title}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">{copy}</p></motion.div>;
}
