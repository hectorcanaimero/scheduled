import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { BloqueoHorario } from './entities/bloqueo-horario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamiento, BloqueoHorario]),
    WhatsappModule,
  ],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
})
export class AgendamientoModule {}
