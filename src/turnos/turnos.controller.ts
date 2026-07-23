import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryTurnosDto } from './dto/query-turnos.dto';
import { PaginatedTurnos, TurnosService } from './turnos.service';

@Controller('turnos')
@UseGuards(JwtAuthGuard)
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @CurrentUser('clinica_id') clinica_id: string,
    @Query() query: QueryTurnosDto,
  ): Promise<PaginatedTurnos> {
    return this.turnosService.findAll({ ...query, clinica_id });
  }
}
