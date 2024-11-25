import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()
    @ApiOperation({ summary: 'Create todo' })
    @ApiResponse({ status: 201, description: 'Todo created successfully.' })
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.create(createTodoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all todos' })
    findAll() {
        return this.todoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get todo by id' })
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update todo' })
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.update(id, updateTodoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete todo' })
    remove(@Param('id') id: string) {
        return this.todoService.remove(id);
    }
}