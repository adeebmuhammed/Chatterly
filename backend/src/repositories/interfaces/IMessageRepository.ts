import { IMessage } from "../../models/message.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IMessageRepository extends IBaseRepository<IMessage> {
  getMessagesByConversation(conversationId: string): Promise<IMessage[]>
}
