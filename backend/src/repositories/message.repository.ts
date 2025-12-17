import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Messages, { IMessage } from "../models/message.model";
import mongoose from "mongoose";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> {
  constructor() {
    super(Messages);
  }

  async getMessagesByChat(chatId: string): Promise<IMessage[]> {
    return Messages.find({ chatId: new mongoose.Types.ObjectId(chatId) })
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .exec();
  }
}
