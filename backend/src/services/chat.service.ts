import { inject, injectable } from "inversify";
import { IChatService } from "./interfaces/IChatService";
import { IChat } from "../models/chat.model";
import { TYPES } from "../config/types";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject(TYPES.IChatRepository) private _chatRepo: IChatRepository
  ) {}

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
