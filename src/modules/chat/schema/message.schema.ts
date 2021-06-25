import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  id: string;

  @Prop()
  sender: string;

  @Prop()
  text: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);