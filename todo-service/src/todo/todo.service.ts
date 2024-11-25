import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TodoService {
    private readonly TODO_KEY = 'todos';

    constructor(private readonly redisService: RedisService) { }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo: Todo = {
            id: uuidv4(),
            ...createTodoDto,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.redisService.hSet(this.TODO_KEY, todo.id, JSON.stringify(todo));
        return todo;
    }

    async findAll(): Promise<Todo[]> {
        const todos = await this.redisService.hGetAll(this.TODO_KEY);
        return Object.values(todos).map(todo => JSON.parse(todo));
    }

    async findOne(id: string): Promise<Todo> {
        const todo = await this.redisService.hGet(this.TODO_KEY, id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return JSON.parse(todo);
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const existingTodo = await this.findOne(id);
        const updatedTodo: Todo = {
            ...existingTodo,
            ...updateTodoDto,
            updatedAt: new Date(),
        };

        await this.redisService.hSet(this.TODO_KEY, id, JSON.stringify(updatedTodo));
        return updatedTodo;
    }

    async remove(id: string): Promise<void> {
        const exists = await this.redisService.hExists(this.TODO_KEY, id);
        if (!exists) {
            throw new Error('Todo not found');
        }
        await this.redisService.hDel(this.TODO_KEY, id);
    }
}