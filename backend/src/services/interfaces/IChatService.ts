import { IChat } from "../../models/chat.model";

export interface IChatService {
  findOrCreateChat: (
    userId: string,
    otherUserId: string
  ) => Promise<{findOrCreateChatResponse: IChat}>;
}
