import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional])],
  exports: [TypeOrmModule],
})
export class ProfesionalModule {}
