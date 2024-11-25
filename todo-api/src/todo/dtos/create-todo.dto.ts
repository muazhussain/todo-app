import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The title of the todo',
        example: 'Clean the house',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The description of the todo',
        example: 'Clean the house',
    })
    @IsString()
    @MaxLength(500)
    description: string;
}