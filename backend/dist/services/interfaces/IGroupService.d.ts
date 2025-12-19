import { IChat } from "../../models/chat.model";
export interface IGroupService {
    createGroup(creatorId: string, userIds: string[], groupName: string): Promise<any>;
    leaveGroup(chatId: string, userId: string): Promise<IChat | null>;
    joinGroup(chatId: string, userId: string): Promise<IChat | null>;
}
//# sourceMappingURL=IGroupService.d.ts.map