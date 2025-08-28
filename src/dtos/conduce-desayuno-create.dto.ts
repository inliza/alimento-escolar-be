// create-conduce.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsDateString, Min, IsOptional, IsDate } from 'class-validator';

export class CreateConduceDto {
    @IsInt() codigo: number;

    @IsInt() escuelaId: number;
    @IsInt() articuloId: number;

    @IsInt()
    @Min(1)
    cantidad: number;

    @Min(0)
    precio: number;          // numeric(12,2)

    @IsOptional()
    @Min(0)
    itbis?: number;          // numeric(12,2) | null

    @IsDateString()   // espera 'YYYY-MM-DD' (ISO 8601 válida)
    fecha: string;    // <-- string, no Date
}