import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        retryAttempts: parseInt(process.env.REDIS_RETRY_ATTEMPTS, 10) || 5,
        retryDelay: parseInt(process.env.REDIS_RETRY_DELAY, 10) || 1000,
    },
    todo: {
        processingInterval: parseInt(process.env.TODO_PROCESSING_INTERVAL, 10) || 5000,
        batchSize: parseInt(process.env.TODO_BATCH_SIZE, 10) || 100,
    },
    queue: {
        name: process.env.QUEUE_NAME || 'todo_queue',
        concurrency: parseInt(process.env.QUEUE_CONCURRENCY, 10) || 3,
    }
}));