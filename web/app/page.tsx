import { CalendarCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="max-w-md text-center">
        <CalendarCheck className="mx-auto mb-5 size-10 text-emerald-800" aria-hidden="true" />
        <h1 className="font-display text-4xl text-emerald-950">Tu turno, sin vueltas.</h1>
        <p className="mt-3 text-stone-600">Abrí el enlace que recibiste por WhatsApp para revisar y confirmar tu reserva.</p>
      </div>
    </main>
  );
}
