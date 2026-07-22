import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from '../agendamiento/entities/agendamiento.entity';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento])],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
