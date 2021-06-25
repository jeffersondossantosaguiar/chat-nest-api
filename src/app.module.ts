import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    ChatModule,
    MongooseModule.forRoot(process.env.MONGO_DB_KEY)
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule { }
