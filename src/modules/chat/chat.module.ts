import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schema/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema, collection: 'conversations' }
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule { }
