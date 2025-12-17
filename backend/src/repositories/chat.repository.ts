import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Chats, { IChat } from "../models/chat.model";
import mongoose, { DeleteResult } from "mongoose";

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

  async getUserChats(userId: string): Promise<any[]> {
  return Chats.aggregate([
    // 1️⃣ Only chats where user is a participant
    {
      $match: {
        participants: new mongoose.Types.ObjectId(userId),
      },
    },

    // 2️⃣ Lookup last message
    {
      $lookup: {
        from: "messages",
        let: { chatId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$chatId", "$$chatId"] },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "lastMessage",
      },
    },

    // 3️⃣ Flatten lastMessage array
    {
      $unwind: {
        path: "$lastMessage",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 4️⃣ Populate participants
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "participants",
      },
    },

    // 5️⃣ Shape final output
    {
      $project: {
        participants: {
          _id: 1,
          name: 1,
          email: 1,
          status: 1,
          lastSeen: 1,
        },
        isGroup: 1,
        groupName: 1,
        createdBy: 1,
        updatedAt: 1,

        lastMessage: "$lastMessage.message",
        lastMessageSender: "$lastMessage.sender",
        lastMessageAt: "$lastMessage.createdAt",
      },
    },

    // 6️⃣ Sort chats by last activity
    {
      $sort: {
        lastMessageAt: -1,
        updatedAt: -1,
      },
    },
  ]);
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
