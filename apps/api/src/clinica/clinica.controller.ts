import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ClinicaId } from '../auth/decorators/clinica-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClinicaService } from './clinica.service';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@Controller('clinica')
@UseGuards(JwtAuthGuard)
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Get()
  get(@ClinicaId() clinicaId: string) {
    return this.clinicaService.findByClinicaId(clinicaId);
  }

  @Put()
  update(@ClinicaId() clinicaId: string, @Body() dto: UpdateClinicaDto) {
    return this.clinicaService.update(clinicaId, dto);
  }
}
