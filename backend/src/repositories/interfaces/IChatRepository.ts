import { IChat } from "../../models/chat.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChat> {
  findOrCreateOneOnOne(user1: string, user2: string): Promise<IChat>;
  getUserChats(userId: string): Promise<IChat[]>;
  deleteChatById(chatId: string): Promise<IChat | null>;
  searchGroupChats(query: string): Promise<IChat[] | []>
}
