import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EvolutionApiService {
  private readonly logger = new Logger(EvolutionApiService.name);
  private readonly baseUrl = process.env.EVO_URL ?? '';
  private readonly apiKey = process.env.EVO_API_KEY ?? '';

  async sendText(instance: string, to: string, text: string): Promise<void> {
    if (!this.baseUrl || !this.apiKey) {
      this.logger.warn('EVO_URL or EVO_API_KEY not configured — skipping send');
      return;
    }

    const url = `${this.baseUrl}/message/sendText/${instance}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: this.apiKey,
      },
      body: JSON.stringify({ number: to, text }),
    });

    if (!response.ok) {
      this.logger.error(
        `Evolution API error ${response.status} sending to ${to}: ${await response.text()}`,
      );
    }
  }
}
