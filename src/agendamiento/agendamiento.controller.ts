import { Controller, Get, Param } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoResponseDto } from './dto/agendamiento-response.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Get(':link_token')
  findOne(
    @Param('link_token') link_token: string,
  ): Promise<AgendamientoResponseDto> {
    return this.agendamientoService.findByLinkToken(link_token);
  }
}
