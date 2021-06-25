import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from './message.schema';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  members: string[];

  @Prop()
  isGroup: boolean;

  @Prop()
  groupName?: string;

  @Prop()
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);