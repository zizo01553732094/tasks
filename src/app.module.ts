import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Ensures access to environment variables
    RedisModule.forRoot({
      url: process.env.REDIS_URL,  // Adjust the Redis URL as needed
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
