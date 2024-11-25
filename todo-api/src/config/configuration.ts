import { registerAs } from "@nestjs/config";

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    todoService: {
        url: process.env.TODO_SERVICE_URL || 'http://localhost:3001',
    }
}));