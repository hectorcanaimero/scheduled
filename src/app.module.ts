import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { Agendamiento } from './agendamiento/entities/agendamiento.entity';
import { BloqueoHorario } from './agendamiento/entities/bloqueo-horario.entity';
import { RLSTenantIsolation20260722000000 } from './database/migrations/20260722000000-RLSTenantIsolation';
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
      entities: [Agendamiento, BloqueoHorario],
      synchronize: process.env.NODE_ENV !== 'production',
      migrations: [RLSTenantIsolation20260722000000],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: process.env.NODE_ENV === 'production',
    }),
    AgendamientoModule,
    WebhookModule,
  ],
})
export class AppModule {}
