import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoAgendamiento } from '../../agendamiento/entities/agendamiento.entity';

export class QueryTurnosDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  // clinica_id siempre viene del JWT (@CurrentUser), nunca del query param
  clinica_id?: string;

  @IsOptional()
  @IsUUID()
  profesional_id?: string;

  @IsOptional()
  @IsEnum(EstadoAgendamiento)
  estado?: EstadoAgendamiento;

  @IsOptional()
  @IsString()
  paciente_nombre?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
