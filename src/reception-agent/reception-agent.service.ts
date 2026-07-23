import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IntentService } from './intent/intent.service';
import { EvolutionApiService } from './evolution/evolution-api.service';

const SCHEDULING_BASE_URL = process.env.SCHEDULING_BASE_URL ?? 'http://localhost:3001';

const MSG_BOOKING_LINK = (url: string) =>
  `¡Hola! Para confirmar tu turno, ingresá al siguiente link:\n\n${url}\n\nAllí vas a poder ver el profesional, horario y valor de la consulta. ✅`;

const MSG_HELP =
  '¡Hola! Soy el asistente de agendamiento. ¿Querés sacar un turno? Escribime "turno" o "cita" para comenzar. 😊';

@Injectable()
export class ReceptionAgentService {
  private readonly logger = new Logger(ReceptionAgentService.name);

  constructor(
    private readonly intentService: IntentService,
    private readonly evolutionApi: EvolutionApiService,
  ) {}

  async handleIncomingMessage(
    from: string,
    text: string,
    instance: string,
  ): Promise<void> {
    const hasBookingIntent = this.intentService.isBookingIntent(text);

    if (!hasBookingIntent) {
      this.logger.log(`No booking intent detected from ${from}, sending help message`);
      await this.evolutionApi.sendText(instance, from, MSG_HELP);
      return;
    }

    // Deterministic path: generate a scheduling link token.
    // When AGD-001 (Insforge gateway spike) resolves as GO, this token
    // creation will be replaced by a call to the Insforge scheduling API,
    // which persists the Turno and returns the link_token.
    const linkToken = randomUUID();
    const schedulingUrl = `${SCHEDULING_BASE_URL}/agendamiento/${linkToken}`;

    this.logger.log(`Booking intent from ${from} — link_token: ${linkToken}`);

    await this.evolutionApi.sendText(instance, from, MSG_BOOKING_LINK(schedulingUrl));
  }
}
