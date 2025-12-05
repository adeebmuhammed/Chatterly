import { inject, injectable } from "inversify";
import { IChatController } from "./interfaces/IChatController";
import { Request, Response } from "express";
import { TYPES } from "../config/types";
import { IChatService } from "../services/interfaces/IChatService";
import { sendSuccess } from "../utils/response.helper";

@injectable()
export class ChatController implements IChatController {
  constructor(@inject(TYPES.IChatService) private _chatService: IChatService) {}

  getUserChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId as string;

      const { userChats } = await this._chatService.getUserChats(userId);

      res.status(200).json(sendSuccess("Chats fetched successfully", userChats));
    } catch (error) {
      res.status(500).json({ message: "Error fetching chats", error });
    }
  };

  findOrCreateChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, otherUserId } = req.body;

      const { findOrCreateChatResponse } =
        await this._chatService.findOrCreateChat(userId, otherUserId);

      res
        .status(200)
        .json(
          sendSuccess(
            "Conversation found or created successfully",
            findOrCreateChatResponse
          )
        );
    } catch (error) {
      res.status(500).json({ message: "Error finding conversation", error });
    }
  };
}
