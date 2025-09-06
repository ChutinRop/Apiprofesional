import { IsString, IsNumber, IsNotEmpty, Min, IsInt, IsPositive } from 'class-validator';

export class CreateProductDto{

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsNumber( {maxDecimalPlaces: 2} )
    @IsPositive()
    precio: number;


    @IsInt()
    @Min(0)
    stock: number;

    @IsString()
    @IsNotEmpty()
    sku: string;
}