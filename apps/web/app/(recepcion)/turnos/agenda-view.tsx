"use client";

import { useMemo, useState } from "react";
import { Bell, CalendarDays, ChevronDown, Clock3, Search, SlidersHorizontal, UsersRound } from "lucide-react";
import type { Turno, TurnoEstado } from "./data";

type Filtro = "todos" | TurnoEstado;
const labels: Record<Filtro, string> = { todos: "Todos", pendente: "Pendentes", confirmado: "Confirmados", cancelado: "Cancelados" };

export function AgendaView({ initialTurnos }: { initialTurnos: readonly Turno[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busca, setBusca] = useState("");
  const lista = useMemo(() => initialTurnos.filter((turno) => {
    const matchesStatus = filtro === "todos" || turno.estado === filtro;
    const term = busca.trim().toLocaleLowerCase("pt-BR");
    const matchesSearch = !term || `${turno.paciente} ${turno.profissional}`.toLocaleLowerCase("pt-BR").includes(term);
    return matchesStatus && matchesSearch;
  }), [busca, filtro, initialTurnos]);

  const confirmados = initialTurnos.filter((turno) => turno.estado === "confirmado").length;
  const pendentes = initialTurnos.filter((turno) => turno.estado === "pendente").length;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">A</span><span><strong>Clínica Aurora</strong><small>Recepção</small></span></a>
        <nav aria-label="Navegação principal"><a className="active" href="#agenda"><CalendarDays size={17} />Agenda</a><a href="#pacientes"><UsersRound size={17} />Pacientes</a></nav>
        <div className="profile"><button aria-label="Notificações" className="icon-button"><Bell size={18} /><i /></button><span className="avatar">MC</span><span className="profile-copy"><strong>Marina Costa</strong><small>Recepcionista</small></span><ChevronDown size={15} /></div>
      </header>

      <section className="shell" id="agenda">
        <div className="eyebrow-agenda"><span /> quarta-feira, 23 de julho</div>
        <div className="headline"><div><h1>Agenda do dia</h1><p>Acompanhe o ritmo da clínica e mantenha cada consulta no lugar certo.</p></div><button className="date-button"><CalendarDays size={17} />Hoje, 23 jul.<ChevronDown size={15} /></button></div>

        <section className="summary" aria-label="Resumo do dia">
          <div><span className="summary-icon green"><CalendarDays size={19} /></span><p><small>Total de turnos</small><strong>{initialTurnos.length}</strong></p><em>hoje</em></div>
          <div><span className="summary-icon amber"><Clock3 size={19} /></span><p><small>Aguardando confirmação</small><strong>{pendentes}</strong></p><em>atenção</em></div>
          <div><span className="summary-icon blue"><UsersRound size={19} /></span><p><small>Confirmados</small><strong>{confirmados}</strong></p><em>no horário</em></div>
        </section>

        <section className="board">
          <div className="toolbar"><div className="tabs" role="tablist">{(Object.keys(labels) as Filtro[]).map((key) => <button key={key} role="tab" aria-selected={filtro === key} onClick={() => setFiltro(key)}>{labels[key]}<span>{key === "todos" ? initialTurnos.length : initialTurnos.filter((t) => t.estado === key).length}</span></button>)}</div><div className="tools"><label><Search size={17} /><input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar paciente ou médico" /></label><button aria-label="Mais filtros"><SlidersHorizontal size={17} />Filtros</button></div></div>
          <div className="table-head"><span>Horário</span><span>Paciente</span><span>Profissional</span><span>Status</span><span /></div>
          <div className="appointments">{lista.map((turno) => <article className={`appointment ${turno.estado}`} key={turno.id}><time>{turno.hora}</time><div className="patient"><span>{turno.paciente.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><p><strong>{turno.paciente}</strong><small>{turno.telefone}</small></p></div><p className="doctor"><strong>{turno.profissional}</strong><small>{turno.especialidade}</small></p><span className="status"><i />{turno.estado}</span><button className="more" aria-label={`Opções para ${turno.paciente}`}>•••</button></article>)}</div>
          {lista.length === 0 && <div className="empty"><Search size={24} /><strong>Nenhum turno encontrado</strong><span>Tente ajustar a busca ou o filtro.</span></div>}
        </section>
      </section>
    </main>
  );
}
