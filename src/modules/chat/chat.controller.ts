import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { AddMessagePayload } from './models/add-message-payload';
import { ChatPayload } from './models/chat-payload';
import { MessagePayload } from './models/message-payload';

@Controller('chat')
export class ChatController {

  constructor(private chatService: ChatService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createChat(@Body() payload: ChatPayload): Promise<ChatPayload> {
    return await this.chatService.createIndividualChat(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getConversations(@Param('userId') userId: string): Promise<ChatPayload[]> {
    return await this.chatService.getConversations(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('messages')
  async createMessage(@Body() payload: AddMessagePayload): Promise<MessagePayload> {
    return await this.chatService.addMessage(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:chatId')
  async getMessages(@Param('chatId') chatId: string): Promise<MessagePayload[]> {
    console.log(chatId);
    return await this.chatService.getMessages(chatId);
  }
}