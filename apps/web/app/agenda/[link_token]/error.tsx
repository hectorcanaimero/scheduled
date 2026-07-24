"use client";

import { AlertCircle } from "lucide-react";

export default function AgendaError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="max-w-md text-center">
        <AlertCircle className="mx-auto mb-5 text-[var(--accent)]" size={42} strokeWidth={1.5} />
        <h1 className="font-[family-name:var(--font-display)] text-4xl">No pudimos abrir tu agenda</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          El enlace puede haber expirado o la agenda no está disponible en este momento.
        </p>
        <button onClick={reset} className="mt-7 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
          Intentar nuevamente
        </button>
      </div>
    </main>
  );
}
