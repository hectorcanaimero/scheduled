import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  exports: [TypeOrmModule],
})
export class TurnoModule {}
