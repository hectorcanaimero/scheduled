import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
