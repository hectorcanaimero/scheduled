import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ClinicaController } from './clinica.controller';
import { ClinicaService } from './clinica.service';
import { Clinica } from './entities/clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinica]), AuthModule],
  controllers: [ClinicaController],
  providers: [ClinicaService],
  exports: [ClinicaService],
})
export class ClinicaModule {}
