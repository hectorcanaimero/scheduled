import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookJwtService } from './webhook-jwt.service';
import { ClinicaService } from '../clinica/clinica.service';
import { WhatsappEventDto } from './dto/whatsapp-event.dto';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: WebhookService;
  let clinicaService: ClinicaService;

  const mockClinica = { id: 'clinica-1', activa: true };
  const mockToken = 'mock-jwt-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: WebhookService,
          useValue: { handleWhatsappEvent: jest.fn() },
        },
        {
          provide: ClinicaService,
          useValue: { findByInstance: jest.fn().mockResolvedValue(mockClinica) },
        },
        {
          provide: WebhookJwtService,
          useValue: { mint: jest.fn().mockReturnValue(mockToken) },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
    clinicaService = module.get<ClinicaService>(ClinicaService);
  });

  it('should return { received: true } and call service', async () => {
    const payload: WhatsappEventDto = {
      event: 'MESSAGES_UPSERT',
      instance: 'test-instance',
      data: {
        key: { remoteJid: '5511999999999@s.whatsapp.net', fromMe: false, id: 'msg-1' },
        pushName: 'John',
        status: 'SERVER_ACK',
        message: { conversation: 'Olá, quero agendar' },
        messageType: 'conversation',
        messageTimestamp: 1721000000,
      },
    };

    const result = await controller.handleWhatsapp(payload);

    expect(result).toEqual({ received: true });
    expect(clinicaService.findByInstance).toHaveBeenCalledWith('test-instance');
    expect(service.handleWhatsappEvent).toHaveBeenCalledWith(payload, mockClinica.id, mockToken);
  });

  it('should throw ForbiddenException when clinica is not active', async () => {
    jest.spyOn(clinicaService, 'findByInstance').mockResolvedValue({ id: 'clinica-2', activa: false } as any);

    const payload: WhatsappEventDto = {
      event: 'MESSAGES_UPSERT',
      instance: 'unknown-instance',
      data: {},
    };

    await expect(controller.handleWhatsapp(payload)).rejects.toThrow(ForbiddenException);
  });
});
