import { IChat } from "../../models/chat.model";
export interface IChatService {
    findOrCreateChat(userId: string, otherUserId: string): Promise<{
        findOrCreateChatResponse: IChat;
    }>;
    getUserChats(userId: string): Promise<{
        userChats: IChat[];
    }>;
    searchGroupChats(query: string): Promise<IChat[]>;
}
//# sourceMappingURL=IChatService.d.ts.map