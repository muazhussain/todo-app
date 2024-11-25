import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTodoDto {
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The title of the todo',
        example: 'Clean the house',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty({
        required: false,
        type: 'boolean',
        description: 'The completed status of the todo',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}