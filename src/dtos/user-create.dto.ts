import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsInt,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsInt()
    @IsNotEmpty()
    idCompany: number;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsInt()
    @IsOptional()
    idProfile?: number;


    @IsString()
    @IsOptional()
    createdBy?: string;
}