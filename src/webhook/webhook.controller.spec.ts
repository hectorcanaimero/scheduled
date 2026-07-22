import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WhatsappEventDto } from './dto/whatsapp-event.dto';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: WebhookService,
          useValue: { handleWhatsappEvent: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
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
    expect(service.handleWhatsappEvent).toHaveBeenCalledWith(payload);
  });
});
