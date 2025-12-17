import { BaseRepository } from "./base.repository";
import { IMessage } from "../models/message.model";
export declare class MessageRepository extends BaseRepository<IMessage> {
    constructor();
    getMessagesByChat(chatId: string): Promise<IMessage[]>;
}
//# sourceMappingURL=message.repository.d.ts.map