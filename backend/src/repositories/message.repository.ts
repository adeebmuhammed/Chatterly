import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Messages, { IMessage } from "../models/message.model";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> {
  constructor() {
    super(Messages);
  }

  async getMessagesByConversation(conversationId: string): Promise<IMessage[]> {
    return Messages.find({ conversationId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 })
      .exec();
  }
}
