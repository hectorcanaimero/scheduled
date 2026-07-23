import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ReceptionAgentModule } from '../reception-agent/reception-agent.module';

@Module({
  imports: [ReceptionAgentModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
