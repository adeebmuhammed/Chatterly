import { IMessage } from "../../models/message.model";
import { IBaseRepository } from "./IBaseRepository";
export interface IMessageRepository extends IBaseRepository<IMessage> {
    getMessagesByChat(chatId: string): Promise<IMessage[]>;
    deleteMessageById(messageId: string): Promise<IMessage | null>;
}
//# sourceMappingURL=IMessageRepository.d.ts.map