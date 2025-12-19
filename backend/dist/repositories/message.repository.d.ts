import { BaseRepository } from "./base.repository";
import { IMessage } from "../models/message.model";
import { IMessageRepository } from "./interfaces/IMessageRepository";
export declare class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
    constructor();
    getMessagesByChat(chatId: string): Promise<IMessage[]>;
    deleteMessageById(messageId: string): Promise<IMessage | null>;
}
//# sourceMappingURL=message.repository.d.ts.map