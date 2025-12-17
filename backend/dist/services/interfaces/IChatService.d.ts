import { IChat } from "../../models/chat.model";
export interface IChatService {
    findOrCreateChat(userId: string, otherUserId: string): Promise<{
        findOrCreateChatResponse: IChat;
    }>;
    getUserChats(userId: string): Promise<{
        userChats: IChat[];
    }>;
}
//# sourceMappingURL=IChatService.d.ts.map