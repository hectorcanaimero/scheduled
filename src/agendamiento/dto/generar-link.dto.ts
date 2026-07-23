import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GenerarLinkDto {
  @IsString()
  @IsNotEmpty()
  clinica_id: string;

  @IsString()
  @IsNotEmpty()
  paciente_nombre: string;

  @IsString()
  @IsNotEmpty()
  paciente_telefono: string;

  @IsString()
  @IsNotEmpty()
  profesional_id: string;

  @IsDateString()
  fecha_hora: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(10)
  @Max(180)
  duracion_minutos?: number;
}
