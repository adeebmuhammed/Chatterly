import { FILE_TYPES } from './common-interface';

export interface IMessage {
  _id: string;
  chatId: string;
  sender: string;
  message: string;
  messageType: FILE_TYPES;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
