import { Request, Response } from "express";
import { IMessageController } from "./interfaces/IMessageController";
import { inject, injectable } from "inversify";
import { STATUS_CODES } from "../utils/constants";
import { sendError, sendSuccess } from "../utils/response.helper";
import { TYPES } from "../config/types";
import { IMessageService } from "../services/interfaces/IMessageService";

@injectable()
export class MessageController implements IMessageController {
  constructor(
    @inject(TYPES.IMessageService) private _messageService: IMessageService
  ) {}

  getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId } = req.params;

      const { getMessagesResponse } = await this._messageService.getMessages(
        chatId as string
      );

      res
        .status(STATUS_CODES.OK)
        .json(
          sendSuccess("Messages fetched successfully", getMessagesResponse)
        );
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Error fetching messages", error));
    }
  };

  sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId, senderId, message } = req.body;

      const { sendMessageResponse } = await this._messageService.sendMessage(
        chatId,
        senderId,
        message
      );

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Message sent successfully", sendMessageResponse));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Error sending message", error));
    }
  };

  deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const messageId = req.params["messageId"] as string;

      const { deleteMessageResponse } =
        await this._messageService.deleteMessage(messageId);

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess(deleteMessageResponse.message));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Error deleting message", error));
    }
  };
}
