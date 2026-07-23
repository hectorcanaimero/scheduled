import { IsOptional, IsString } from 'class-validator';

export class ConfirmarAgendamientoDto {
  @IsOptional()
  @IsString()
  confirmado_por?: string;
}
