import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { Clinica } from './entities/clinica.entity';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectRepository(Clinica)
    private readonly clinicaRepo: Repository<Clinica>,
  ) {}

  async findByClinicaId(clinicaId: string): Promise<Clinica> {
    const clinica = await this.clinicaRepo.findOne({ where: { id: clinicaId } });
    if (!clinica) throw new NotFoundException('Clínica no encontrada');
    return clinica;
  }

  async update(clinicaId: string, dto: UpdateClinicaDto): Promise<Clinica> {
    const clinica = await this.findByClinicaId(clinicaId);
    Object.assign(clinica, dto);
    return this.clinicaRepo.save(clinica);
  }
}
