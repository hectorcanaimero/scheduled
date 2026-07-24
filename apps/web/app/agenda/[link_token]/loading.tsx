export default function LoadingAgenda() {
  return (
    <main className="mx-auto min-h-screen max-w-[1120px] animate-pulse px-5 py-10 md:px-10">
      <div className="h-12 border-b border-[var(--line)]" />
      <div className="grid gap-12 py-16 md:grid-cols-[.8fr_1.7fr]">
        <div className="space-y-4">
          <div className="h-3 w-24 rounded bg-[var(--sage)]" />
          <div className="h-40 rounded-3xl bg-[var(--sage)]/70" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-24 rounded-2xl bg-white/70" />)}
        </div>
      </div>
    </main>
  );
}
