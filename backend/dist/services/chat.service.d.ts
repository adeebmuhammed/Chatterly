import { IChatService } from "./interfaces/IChatService";
import { IChat } from "../models/chat.model";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
export declare class ChatService implements IChatService {
    private _chatRepo;
    private _userRepo;
    constructor(_chatRepo: IChatRepository, _userRepo: IUserRepository);
    getUserChats: (userId: string) => Promise<{
        userChats: IChat[];
    }>;
    findOrCreateChat: (userId: string, otherUserId: string) => Promise<{
        findOrCreateChatResponse: IChat;
    }>;
    searchGroupChats: (query: string) => Promise<IChat[]>;
}
//# sourceMappingURL=chat.service.d.ts.map