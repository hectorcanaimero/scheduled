import { IsOptional, IsString, IsEnum, IsInt, Min, Max, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoTurno } from '../entities/turno.entity';

export class QueryTurnosDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  medico_id?: string;

  @IsOptional()
  @IsString()
  clinica_id?: string;

  @IsOptional()
  @IsEnum(EstadoTurno)
  estado?: EstadoTurno;

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
