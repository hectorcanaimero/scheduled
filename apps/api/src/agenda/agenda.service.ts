import { Injectable, Logger } from '@nestjs/common';
import { AgendaQueryDto } from './dto/agenda-query.dto';
import { AgendaResponseDto, TurnoDto } from './dto/agenda-response.dto';

@Injectable()
export class AgendaService {
  private readonly logger = new Logger(AgendaService.name);

  async getByProfesional(
    profesionalId: string,
    query: AgendaQueryDto,
  ): Promise<AgendaResponseDto> {
    this.logger.log(
      `GET /agenda/${profesionalId} — query: ${JSON.stringify(query)}`,
    );

    // TODO (AGD-013): replace stub with Insforge repository call
    const turnos = await this.fetchTurnos(profesionalId, query);

    return { profesional_id: profesionalId, turnos };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async fetchTurnos(_profesionalId: string, _query: AgendaQueryDto): Promise<TurnoDto[]> {
    // Placeholder until Insforge data layer is wired
    return [];
  }
}
