import { AgendaView } from "./agenda-view";
import { turnos } from "./data";

export default function TurnosPage() {
  return <AgendaView initialTurnos={turnos} />;
}
