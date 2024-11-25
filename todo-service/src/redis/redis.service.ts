import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: RedisClientType;

    constructor(private configService: ConfigService) {
        this.client = createClient({
            url: this.configService.get('REDIS_URL') || 'redis://localhost:6379',
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    async onModuleInit() {
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    async hSet(key: string, field: string, value: string): Promise<number> {
        return await this.client.hSet(key, field, value);
    }

    async hGet(key: string, field: string): Promise<string | null> {
        return await this.client.hGet(key, field);
    }

    async hGetAll(key: string): Promise<{ [key: string]: string }> {
        return await this.client.hGetAll(key);
    }

    async hExists(key: string, field: string): Promise<boolean> {
        return await this.client.hExists(key, field);
    }

    async hDel(key: string, field: string): Promise<number> {
        return await this.client.hDel(key, field);
    }
}