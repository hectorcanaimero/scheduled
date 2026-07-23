import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly http: AxiosInstance;
  private readonly instance: string;

  constructor() {
    const baseURL = process.env.EVOLUTION_API_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;
    this.instance = process.env.EVOLUTION_INSTANCE_NAME ?? 'default';

    this.http = axios.create({
      baseURL,
      headers: { apikey: apiKey },
    });
  }

  async sendText(number: string, text: string): Promise<void> {
    try {
      await this.http.post(`/message/sendText/${this.instance}`, {
        number,
        text,
        delay: 1200,
      });
      this.logger.log(`Message sent via instance: ${this.instance}`);
    } catch (err) {
      this.logger.error(`Failed to send message via instance ${this.instance}: ${(err as Error)?.message}`);
      throw err;
    }
  }
}
