import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AgendamientoService } from './agendamiento.service';
import { ConfirmarAgendamientoDto } from './dto/confirmar-agendamiento.dto';
import { GenerarLinkDto } from './dto/generar-link.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post('generar-link')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  generarLink(@Body() dto: GenerarLinkDto) {
    return this.agendamientoService.generarYEnviarLink(dto);
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
