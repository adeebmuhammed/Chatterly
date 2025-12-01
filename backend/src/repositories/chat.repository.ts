import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Chats, { IChat } from "../models/chat.model";

@injectable()
export class ChatRepository extends BaseRepository<IChat> {
  constructor() {
    super(Chats);
  }

  async findOrCreateOneOnOne(user1: string, user2: string): Promise<IChat> {
    let chat = await Chats.findOne({
      isGroup: false,
      participants: { $all: [user1, user2] },
    });

    if (!chat) {
      chat = await Chats.create({
        participants: [user1, user2],
        isGroup: false,
      });
    }

    return chat;
  }

  async getUserChats(userId: string): Promise<IChat[]> {
    return Chats.find({
      participants: { $in: [userId] },
    })
      .populate("participants", "name email status lastSeen")
      .sort({ updatedAt: -1 })
      .exec();
  }
}
