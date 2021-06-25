import { MessagePayload } from "./message-payload";

export class ChatPayload {
  _id?: string;
  messages?: MessagePayload[];
  members: string[];
  isGroup: boolean;
  groupName?: string;
  createdAt?: string;
  updatedAt?: string;
}