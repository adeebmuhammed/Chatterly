import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import mongoose from "mongoose";
import { IMessage } from "../models/message.model";
import { IMessageService } from "./interfaces/IMessageService";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.IMessageRepository) private _messageRepo: IMessageRepository
  ) {}

  sendMessage = async (
    chatId: string,
    senderId: string,
    message: string
  ): Promise<{ sendMessageResponse: IMessage }> => {
    const sendMessageResponse = await this._messageRepo.create({
      chatId: new mongoose.Types.ObjectId(chatId),
      sender: new mongoose.Types.ObjectId(senderId),
      message,
    });

    return { sendMessageResponse };
  };

  getMessages = async (
    chatId: string
  ): Promise<{ getMessagesResponse: IMessage[] }> => {
    const getMessagesResponse = await this._messageRepo.getMessagesByChat(
      chatId
    );
    return { getMessagesResponse };
  };
}
