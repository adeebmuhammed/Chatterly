import { Request, Response } from "express";
export interface IGroupController {
    createGroup(req: Request, res: Response): Promise<void>;
    leaveGroup(req: Request, res: Response): Promise<void>;
    joinGroup(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IGroupController.d.ts.map