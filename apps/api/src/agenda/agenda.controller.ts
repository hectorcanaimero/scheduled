import {
  Controller,
  Get,
  Param,
  Query,
  Logger,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaQueryDto } from './dto/agenda-query.dto';
import { AgendaResponseDto } from './dto/agenda-response.dto';

@Controller('agenda')
export class AgendaController {
  private readonly logger = new Logger(AgendaController.name);

  constructor(private readonly agendaService: AgendaService) {}

  @Get(':profesional_id')
  async getAgenda(
    @Param('profesional_id') profesionalId: string,
    @Query() query: AgendaQueryDto,
  ): Promise<AgendaResponseDto> {
    this.logger.log(`GET /agenda/${profesionalId}`);
    return this.agendaService.getByProfesional(profesionalId, query);
  }
}
