import {
    IsNotEmpty,
    IsInt,
} from 'class-validator';

export class CreateMenuDto {
    @IsInt()
    @IsNotEmpty()
    articuloId: number;

    @IsInt()
    @IsNotEmpty()
    diaId: number;

}