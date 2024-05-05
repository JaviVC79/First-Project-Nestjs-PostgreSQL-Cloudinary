import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, Max } from "class-validator";


export class CreateUserDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;



}