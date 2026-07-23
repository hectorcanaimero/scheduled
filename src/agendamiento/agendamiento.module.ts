import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../turno/entities/turno.entity';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { BloqueoHorario } from './entities/bloqueo-horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento, BloqueoHorario, Turno])],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
})
export class AgendamientoModule {}
