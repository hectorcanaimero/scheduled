import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookJwtService } from './webhook-jwt.service';
import { ClinicaService } from '../clinica/clinica.service';
import { WhatsappEventDto } from './dto/whatsapp-event.dto';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly webhookService: WebhookService,
    private readonly clinicaService: ClinicaService,
    private readonly webhookJwtService: WebhookJwtService,
  ) {}

  @Post('whatsapp')
  @HttpCode(HttpStatus.OK)
  async handleWhatsapp(@Body() body: WhatsappEventDto): Promise<{ received: boolean }> {
    const clinica = await this.clinicaService.findByInstance(body.instance);
    if (!clinica?.activa) {
      throw new ForbiddenException('Instancia no autorizada');
    }

    const token = this.webhookJwtService.mint(clinica.id, body.instance);
    this.logger.log(`POST /webhook/whatsapp — event: ${body.event} clinica: ${clinica.id}`);

    await this.webhookService.handleWhatsappEvent(body, clinica.id, token);
    return { received: true };
  }
}
