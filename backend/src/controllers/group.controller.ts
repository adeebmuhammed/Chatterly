import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IGroupController } from "./interfaces/IGroupController";
import { IGroupService } from "../services/interfaces/IGroupService";
import { TYPES } from "../config/types";
import { sendError, sendSuccess } from "../utils/response.helper";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class GroupController implements IGroupController {
  constructor(
    @inject(TYPES.IGroupService) private _groupService: IGroupService
  ) {}

  async createGroup(req: Request, res: Response) {
    try {
      const { creatorId, userIds, groupName } = req.body;

      const group = await this._groupService.createGroup(
        creatorId,
        userIds,
        groupName
      );

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Group created successfully", group));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Failed to create group", error));
    }
  }

  async joinGroup(req: Request, res: Response) {
    try {
      const { chatId, userId } = req.body;

      const group = await this._groupService.joinGroup(chatId, userId);

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Joined group successfully", group));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Failed to join group", error));
    }
  }

  async leaveGroup(req: Request, res: Response) {
    try {
      const { chatId, userId } = req.body;

      const group = await this._groupService.leaveGroup(chatId, userId);

      res
        .status(STATUS_CODES.OK)
        .json(sendSuccess("Left group successfully", group));
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(sendError("Failed to leave group", error));
    }
  }
}
