import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Chats, { IChat } from "../models/chat.model";
import { DeleteResult } from "mongoose";

@injectable()
export class ChatRepository extends BaseRepository<IChat> {
  constructor() {
    super(Chats);
  }

  async findOrCreateOneOnOne(user1: string, user2: string): Promise<IChat> {
    let chat = await Chats.findOne({
      isGroup: false,
      participants: { $all: [user1, user2] },
    })
      .populate("participants", "name email status lastSeen")
      .exec();

    // Create if not exists
    if (!chat) {
      chat = await Chats.create({
        participants: [user1, user2],
        isGroup: false,
      });

      chat = await Chats.findById(chat._id)
        .populate("participants", "name email status lastSeen")
        .exec();

      if (!chat) {
        throw new Error("Failed to create chat");
      }
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

  async deleteChatById(chatId: string): Promise<IChat | null> {
    const result = await Chats.findByIdAndDelete(chatId).exec();
    return result;
  }

  async searchGroupChats(query: string): Promise<IChat[]  | []> {
    const groups = await Chats.find({
      isGroup: true,
      groupName: { $regex: query, $options: "i" },
    })
      .populate("createdBy", "name email")
      .exec();
    return groups;
  }
}
