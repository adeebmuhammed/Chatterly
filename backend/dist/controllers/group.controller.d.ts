import { Request, Response } from "express";
import { IGroupController } from "./interfaces/IGroupController";
import { IGroupService } from "../services/interfaces/IGroupService";
export declare class GroupController implements IGroupController {
    private _groupService;
    constructor(_groupService: IGroupService);
    createGroup(req: Request, res: Response): Promise<void>;
    joinGroup(req: Request, res: Response): Promise<void>;
    leaveGroup(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=group.controller.d.ts.map