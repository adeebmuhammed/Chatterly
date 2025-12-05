import { inject, injectable } from "inversify";
import { IChatService } from "./interfaces/IChatService";
import { IChat } from "../models/chat.model";
import { TYPES } from "../config/types";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { MESSAGES } from "../utils/constants";

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject(TYPES.IChatRepository) private _chatRepo: IChatRepository,
    @inject(TYPES.IUserRepository) private _userRepo: IUserRepository
  ) {}

  getUserChats = async (userId: string): Promise<{ userChats: IChat[] }> => {
    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    const userChats = await this._chatRepo.getUserChats(userId);
    return { userChats };
  };

  findOrCreateChat = async (
    userId: string,
    otherUserId: string
  ): Promise<{ findOrCreateChatResponse: IChat }> => {
    // check if conversation exists
    let findOrCreateChatResponse = await this._chatRepo.findOrCreateOneOnOne(
      userId,
      otherUserId
    );

    return { findOrCreateChatResponse };
  };
}
