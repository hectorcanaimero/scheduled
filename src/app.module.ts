import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { Agendamiento } from './agendamiento/entities/agendamiento.entity';
import { BloqueoHorario } from './agendamiento/entities/bloqueo-horario.entity';
import { WebhookModule } from './webhook/webhook.module';
import { AgendaModule } from './agenda/agenda.module';
import { PacienteModule } from './paciente/paciente.module';
import { Paciente } from './paciente/entities/paciente.entity';
import { ProfesionalModule } from './profesional/profesional.module';
import { Profesional } from './profesional/entities/profesional.entity';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';
import { Disponibilidad } from './disponibilidad/entities/disponibilidad.entity';
import { TurnoModule } from './turno/turno.module';
import { Turno } from './turno/entities/turno.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'scheduled',
      entities: [Agendamiento, BloqueoHorario, Paciente, Profesional, Disponibilidad, Turno],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AgendamientoModule,
    WebhookModule,
    AgendaModule,
    PacienteModule,
    ProfesionalModule,
    DisponibilidadModule,
    TurnoModule,
  ],
})
export class AppModule {}
