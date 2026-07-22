import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { AgendaModule } from './agenda/agenda.module';

@Module({
  imports: [WebhookModule, AgendaModule],
})
export class AppModule {}
