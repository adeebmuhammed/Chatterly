import { BaseRepository } from "./base.repository";
import { IChat } from "../models/chat.model";
export declare class ChatRepository extends BaseRepository<IChat> {
    constructor();
    findOrCreateOneOnOne(user1: string, user2: string): Promise<IChat>;
    getUserChats(userId: string): Promise<any[]>;
    deleteChatById(chatId: string): Promise<IChat | null>;
    searchGroupChats(query: string): Promise<IChat[] | []>;
}
//# sourceMappingURL=chat.repository.d.ts.map