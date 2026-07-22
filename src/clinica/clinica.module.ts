import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica } from './entities/clinica.entity';
import { ClinicaService } from './clinica.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinica])],
  providers: [ClinicaService],
  exports: [ClinicaService],
})
export class ClinicaModule {}
