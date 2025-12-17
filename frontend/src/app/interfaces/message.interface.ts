import { FILE_TYPES } from '../constants/constants';

export interface IMessage {
  _id: string;
  chatId: string;
  sender: Sender;
  message: string;
  messageType: FILE_TYPES;
  fileUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Sender {
  _id: string;
  name: string;
  email: string;
}
