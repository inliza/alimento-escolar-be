import { IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateEscuelaDto {
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
    @IsBoolean()
    prepara?: boolean;

    @IsOptional()
    @IsString()
    prepara_Day?: string;

}