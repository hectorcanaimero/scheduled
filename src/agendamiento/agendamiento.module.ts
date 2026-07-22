import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantContextService } from '../common/tenant/tenant-context.service';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { BloqueoHorario } from './entities/bloqueo-horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento, BloqueoHorario])],
  controllers: [AgendamientoController],
  providers: [AgendamientoService, TenantContextService],
})
export class AgendamientoModule {}
