import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import mongoose from "mongoose";
import { IMessage } from "../models/message.model";
import { IMessageService } from "./interfaces/IMessageService";
import { IChat } from "../models/chat.model";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { MessageResponseDto } from "../dto/base.dto";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.IMessageRepository) private _messageRepo: IMessageRepository,
    @inject(TYPES.IChatRepository) private _chatRepo: IChatRepository
  ) {}

  sendMessage = async (
    chatId: string,
    senderId: string,
    message: string
  ): Promise<{ sendMessageResponse: IMessage }> => {
    const chat = await this._chatRepo.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

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

  deleteMessage = async (
    messageId: string
  ): Promise<{ deleteMessageResponse: MessageResponseDto }> => {
    const message = this._messageRepo.findById(messageId);
    if (!message) {
      throw new Error("message not found");
    }

    const deleted = await this._messageRepo.deleteMessageById(messageId);
    if (!deleted) {
      throw new Error("failed to delete message");
    }

    const deleteMessageResponse: MessageResponseDto = {
      message: "message deleted successfully",
    };

    return { deleteMessageResponse };
  };
}
