import { IsOptional, IsString } from 'class-validator';

export class UpdateClinicaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsString()
  whatsapp_numero?: string;
}
