import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TodoModule,
    RedisModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
