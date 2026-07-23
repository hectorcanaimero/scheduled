import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookJwtService } from './webhook-jwt.service';
import { WebhookJwtGuard } from './guards/webhook-jwt.guard';
import { ClinicaModule } from '../clinica/clinica.module';
import { ReceptionAgentModule } from '../reception-agent/reception-agent.module';

@Module({
  imports: [
    ClinicaModule,
    JwtModule.register({
      secret: process.env.WEBHOOK_JWT_SECRET ?? 'changeme-set-in-env',
      signOptions: { expiresIn: '5m' },
    }),
    ReceptionAgentModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookJwtService, WebhookJwtGuard],
  exports: [WebhookJwtService, WebhookJwtGuard],
})
export class WebhookModule {}
