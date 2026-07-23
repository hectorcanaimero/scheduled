import { AgendaView } from "./turnos/agenda-view";
import { turnos } from "./turnos/data";

export default function Home() {
  return <AgendaView initialTurnos={turnos} />;
}
