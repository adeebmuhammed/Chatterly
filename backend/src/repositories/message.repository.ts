import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Messages, { IMessage } from "../models/message.model";
import mongoose from "mongoose";
import { IMessageRepository } from "./interfaces/IMessageRepository";

@injectable()
export class MessageRepository
  extends BaseRepository<IMessage>
  implements IMessageRepository
{
  constructor() {
    super(Messages);
  }

  async getMessagesByChat(chatId: string): Promise<IMessage[]> {
    return Messages.find({ chatId: new mongoose.Types.ObjectId(chatId) })
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .exec();
  }

  async deleteMessageById(messageId: string): Promise<IMessage | null> {
    const result = await Messages.findByIdAndDelete(messageId).exec();
    return result;
  }
}
