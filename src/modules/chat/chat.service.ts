import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from "uuid";
import { AddMessagePayload } from './models/add-message-payload';
import { ChatPayload } from './models/chat-payload';
import { MessagePayload } from './models/message-payload';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) { }

  async createIndividualChat(payload): Promise<ChatPayload> {
    const {
      members,
    } = payload;

    const createdChat = new this.chatModel({
      members,
      isGroup: false,
      messages: []
    });

    const chat = await createdChat.save();

    return chat;
  }

  async getConversations(userId: string): Promise<ChatPayload[]> {
    const conversations = this.chatModel.find({ members: { $all: [userId] } }, { members: 1, isGroup: 1, createdAt: 1, updatedAt: 1 });

    return conversations;
  };

  async getOneConversation(chatId: string): Promise<ChatPayload> {
    return await this.chatModel.findOne({ _id: chatId });
  }

  async addMessage(payload: AddMessagePayload): Promise<MessagePayload> {
    const {
      chatId,
      sender,
      text,
    } = payload;

    const newMessage = {
      id: uuidV4(),
      sender,
      text,
      createdAt: new Date().toISOString()
    };

    const conversation = await this.getOneConversation(chatId);

    await this.chatModel.updateOne(
      { _id: conversation._id },
      { $push: { messages: newMessage } }
    );

    return newMessage;
  };

  async getMessages(chatId: string): Promise<MessagePayload[]> {
    const conversation = await this.getOneConversation(chatId);

    return conversation.messages;
  }
}
