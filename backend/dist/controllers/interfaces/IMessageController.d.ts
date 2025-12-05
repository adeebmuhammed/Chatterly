import { Request, Response } from "express";
export interface IMessageController {
    sendMessage: (req: Request, res: Response) => Promise<void>;
    getMessages: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=IMessageController.d.ts.map