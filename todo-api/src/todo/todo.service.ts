import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Todo } from './interfaces/todo.interface';
import { firstValueFrom } from 'rxjs';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
    private readonly serviceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.serviceUrl = this.configService.get<string>('app.todoService.url');
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { data } = await firstValueFrom(
            this.httpService.post<Todo>(`${this.serviceUrl}/todos`, createTodoDto)
        );
        return data;
    }

    async findAll(): Promise<Todo[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Todo[]>(`${this.serviceUrl}/todos`)
        );
        return data;
    }

    async findOne(id: string): Promise<Todo> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<Todo>(`${this.serviceUrl}/todos/${id}`)
            );
            return data;
        } catch (error) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.patch<Todo>(`${this.serviceUrl}/todos/${id}`, updateTodoDto)
            );
            return data;
        } catch (error) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await firstValueFrom(
                this.httpService.delete(`${this.serviceUrl}/todos/${id}`)
            );
        } catch (error) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
    }
}