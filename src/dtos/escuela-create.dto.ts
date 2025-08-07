import { IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateEscuelaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  codigoEscuela: string;

  @IsInt()
  racion: number;

  @IsInt()
  idLocalidad: number;

  @IsInt()
  idDistrito: number;

  @IsOptional()
  @IsInt()
  idCompany?: number;

  @IsOptional()
  @IsString()
  tipoEscuela?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsBoolean()
  prepara?: boolean;

  @IsOptional()
  @IsString()
  prepara_Day?: string;
}