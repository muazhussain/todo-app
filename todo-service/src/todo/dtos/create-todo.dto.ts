import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsString()
    @MaxLength(500)
    description: string;
}