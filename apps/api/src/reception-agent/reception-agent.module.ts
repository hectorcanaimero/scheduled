import { Module } from '@nestjs/common';
import { ReceptionAgentService } from './reception-agent.service';
import { IntentService } from './intent/intent.service';
import { EvolutionApiService } from './evolution/evolution-api.service';

@Module({
  providers: [ReceptionAgentService, IntentService, EvolutionApiService],
  exports: [ReceptionAgentService],
})
export class ReceptionAgentModule {}
