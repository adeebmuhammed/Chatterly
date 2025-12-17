import { inject, injectable } from "inversify";
import { IGroupService } from "./interfaces/IGroupService";
import { TYPES } from "../config/types";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import mongoose from "mongoose";
import { IChat } from "../models/chat.model";

@injectable()
export class GroupService implements IGroupService {
  constructor(
    @inject(TYPES.IChatRepository) private _chatRepo: IChatRepository,
    @inject(TYPES.IUserRepository) private _userRepo: IUserRepository
  ) {}

  async createGroup(
    creatorId: string,
    userIds: string[],
    groupName: string
  ): Promise<{ group: IChat }> {
    const creator = await this._userRepo.findById(creatorId);
    if (!creator) {
      throw new Error("Creator user not found");
    }

    for (const id of userIds) {
      const user = await this._userRepo.findById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
    }

    const existingGroup = await this._chatRepo.findOne({
      isGroup: true,
      groupName,
    });

    if (existingGroup) {
      throw new Error("Group with the same name already exists");
    }

    const group = await this._chatRepo.create({
      participants: [
        new mongoose.Types.ObjectId(creatorId),
        ...userIds.map((id) => new mongoose.Types.ObjectId(id)),
      ],
      isGroup: true,
      groupName,
      createdBy: new mongoose.Types.ObjectId(creatorId),
    });

    if (!group) {
      throw new Error("Failed to create group chat");
    }

    return { group };
  }

  async leaveGroup(chatId: string, userId: string): Promise<IChat | null> {
    const chat = await this._chatRepo.findById(chatId);

    if (!chat) throw new Error("Group not found");

    // Check if leaving user is the admin
    let isAdmin;
    if (chat.createdBy) {
      isAdmin = chat.createdBy.toString() === userId;
    }

    chat.participants = chat.participants.filter(
      (id) => id.toString() !== userId
    );

    if (isAdmin && chat.participants.length > 0) {
      chat.createdBy = chat.participants[0];
    }

    let result;
    if (chat.participants.length === 0) {
      result = await this._chatRepo.deleteChatById(chatId);
      if (!result) throw new Error("Failed to delete empty group chat");
    } else {
      result = await chat.save();
    }

    return result;
  }

  async joinGroup(chatId: string, userId: string): Promise<IChat | null> {
    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    let chat = await this._chatRepo.findById(chatId);

    if (!chat) throw new Error("Group not found");

    if (!chat.isGroup) throw new Error("Not a group chat");

    if (chat.participants.includes(new mongoose.Types.ObjectId(userId)))
      throw new Error("User already in group");

    chat = await this._chatRepo.update(chatId, {
      participants: [...chat.participants, new mongoose.Types.ObjectId(userId)],
    });

    return chat;
  }
}
