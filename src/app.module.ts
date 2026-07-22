import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { Agendamiento } from './agendamiento/entities/agendamiento.entity';
import { BloqueoHorario } from './agendamiento/entities/bloqueo-horario.entity';
import { ClinicaModule } from './clinica/clinica.module';
import { Clinica } from './clinica/entities/clinica.entity';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'scheduled',
      entities: [Agendamiento, BloqueoHorario, Clinica],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ClinicaModule,
    AgendamientoModule,
    WebhookModule,
  ],
})
export class AppModule {}
