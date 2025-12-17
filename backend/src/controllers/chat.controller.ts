import { inject, injectable } from "inversify";
import { IChatController } from "./interfaces/IChatController";
import { Request, Response } from "express";
import { TYPES } from "../config/types";
import { IChatService } from "../services/interfaces/IChatService";
import { sendError, sendSuccess } from "../utils/response.helper";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class ChatController implements IChatController {
  constructor(@inject(TYPES.IChatService) private _chatService: IChatService) {}

  getUserChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId as string;

      const { userChats } = await this._chatService.getUserChats(userId);

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Chats fetched successfully", userChats));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Failed to fetch chats", error));
    }
  };

  findOrCreateChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, otherUserId } = req.body;

      const { findOrCreateChatResponse } =
        await this._chatService.findOrCreateChat(userId, otherUserId);

      const io = req.app.get("io");

      // Notify the other user
      io.to(otherUserId).emit("newChat", findOrCreateChatResponse);

      res
        .status(STATUS_CODES.OK)
        .json(
          sendSuccess(
            "Conversation found or created successfully",
            findOrCreateChatResponse
          )
        );
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Failed to find or create chat", error));
    }
  };

  searchGroupChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string;

      const groups = await this._chatService.searchGroupChats(query);

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Groups Fetched Successfully", groups));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Error Searching Group Chats"));
    }
  };
}
