import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Messages, { IMessage } from "../models/message.model";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> {
  constructor() {
    super(Messages);
  }

  async getMessagesByChat(chatId: string): Promise<IMessage[]> {
    return Messages.find({ chatId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .exec();
  }
}
