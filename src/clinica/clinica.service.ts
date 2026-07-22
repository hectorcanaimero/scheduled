import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinica } from './entities/clinica.entity';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Clinica)
    private readonly clinicaRepo: Repository<Clinica>,
  ) {}

  findByInstance(instanceEvo: string): Promise<Clinica | null> {
    return this.clinicaRepo.findOne({ where: { instance_evo: instanceEvo } });
  }
}
