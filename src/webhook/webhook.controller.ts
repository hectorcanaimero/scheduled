import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WhatsappEventDto } from './dto/whatsapp-event.dto';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly webhookService: WebhookService) {}

  @Post('whatsapp')
  @HttpCode(HttpStatus.OK)
  async handleWhatsapp(@Body() body: WhatsappEventDto): Promise<{ received: boolean }> {
    this.logger.log(`POST /webhook/whatsapp — event: ${body.event}`);
    await this.webhookService.handleWhatsappEvent(body);
    return { received: true };
  }
}
