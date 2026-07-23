import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { ConfirmarAgendamientoDto } from './dto/confirmar-agendamiento.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Get(':link_token')
  findOne(@Param('link_token') link_token: string) {
    return this.agendamientoService.findByLinkToken(link_token);
  }

  @Post(':link_token/confirmar')
  @HttpCode(HttpStatus.OK)
  confirmar(
    @Param('link_token') link_token: string,
    @Body() dto: ConfirmarAgendamientoDto,
  ) {
    return this.agendamientoService.confirmar(link_token, dto);
  }
}
