import { Injectable, Logger } from '@nestjs/common';
import {
  WhatsappEventDto,
  MessageDataDto,
  ConnectionDataDto,
} from './dto/whatsapp-event.dto';
import { ReceptionAgentService } from '../reception-agent/reception-agent.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly receptionAgent: ReceptionAgentService) {}

  async handleWhatsappEvent(event: WhatsappEventDto): Promise<void> {
    this.logger.log(`Received event: ${event.event} from instance: ${event.instance}`);

    switch (event.event) {
      case 'MESSAGES_UPSERT':
        await this.handleMessageUpsert(event);
        break;
      case 'CONNECTION_UPDATE':
        await this.handleConnectionUpdate(event);
        break;
      case 'MESSAGES_UPDATE':
        this.logger.log(`Message status update for instance: ${event.instance}`);
        break;
      default:
        this.logger.warn(`Unhandled event type: ${event.event}`);
    }
  }

  private async handleMessageUpsert(event: WhatsappEventDto): Promise<void> {
    const data = event.data as MessageDataDto;

    if (data.key?.fromMe) {
      return;
    }

    const remoteJid = data.key?.remoteJid ?? '';
    const isGroup = remoteJid.endsWith('@g.us');

    if (isGroup) {
      return;
    }

    const text = this.extractMessageText(data);

    if (!text) {
      this.logger.log(`Non-text message received from ${remoteJid}, skipping`);
      return;
    }

    this.logger.log(`Message from ${remoteJid} (${data.pushName}): ${text}`);

    await this.receptionAgent.handleIncomingMessage(remoteJid, text, event.instance);
  }

  private async handleConnectionUpdate(event: WhatsappEventDto): Promise<void> {
    const data = event.data as ConnectionDataDto;
    this.logger.log(`Connection state for ${data.instance}: ${data.state}`);
  }

  private extractMessageText(data: MessageDataDto): string | null {
    const msg = data.message;
    if (!msg) return null;

    return (
      msg.conversation ??
      msg.extendedTextMessage?.text ??
      msg.imageMessage?.caption ??
      msg.documentMessage?.caption ??
      null
    );
  }
}
