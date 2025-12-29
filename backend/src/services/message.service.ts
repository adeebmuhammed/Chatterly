import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import mongoose from "mongoose";
import { IMessage } from "../models/message.model";
import { IMessageService } from "./interfaces/IMessageService";
import { IChat } from "../models/chat.model";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { MessageResponseDto } from "../dto/base.dto";
import { FILE_TYPES } from "../utils/constants";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.IMessageRepository) private _messageRepo: IMessageRepository,
    @inject(TYPES.IChatRepository) private _chatRepo: IChatRepository
  ) {}

  sendMessage = async (
    chatId: string,
    senderId: string,
    message?: string,
    mediaUrl?: string,
    messageType: FILE_TYPES = FILE_TYPES.TEXT
  ): Promise<{ sendMessageResponse: IMessage }> => {
    const chat = await this._chatRepo.findById(chatId);
    if (!chat) throw new Error("Chat not found");

    if (messageType !== FILE_TYPES.TEXT && !mediaUrl) {
      throw new Error("Media URL required for non-text messages");
    }

    console.log(mediaUrl);
    

    const sendMessageResponse = await this._messageRepo.create({
      chatId: new mongoose.Types.ObjectId(chatId),
      sender: new mongoose.Types.ObjectId(senderId),
      message: messageType === FILE_TYPES.TEXT ? message : "",
      messageType,
      fileUrl: mediaUrl || undefined,
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
