import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryTurnosDto } from './dto/query-turnos.dto';
import { PaginatedTurnos, TurnosService } from './turnos.service';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: QueryTurnosDto): Promise<PaginatedTurnos> {
    return this.turnosService.findAll(query);
  }
}
