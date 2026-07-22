import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TurnosService, PaginatedTurnos } from './turnos.service';
import { QueryTurnosDto } from './dto/query-turnos.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: QueryTurnosDto): Promise<PaginatedTurnos> {
    return this.turnosService.findAll(query);
  }
}
