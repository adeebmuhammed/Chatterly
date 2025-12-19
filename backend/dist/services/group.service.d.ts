import { IGroupService } from "./interfaces/IGroupService";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IChat } from "../models/chat.model";
export declare class GroupService implements IGroupService {
    private _chatRepo;
    private _userRepo;
    constructor(_chatRepo: IChatRepository, _userRepo: IUserRepository);
    createGroup(creatorId: string, userIds: string[], groupName: string): Promise<{
        group: IChat;
    }>;
    leaveGroup(chatId: string, userId: string): Promise<IChat | null>;
    joinGroup(chatId: string, userId: string): Promise<IChat | null>;
}
//# sourceMappingURL=group.service.d.ts.map