import { Request, Response } from "express";
import { IMessageController } from "./interfaces/IMessageController";
import { IMessageService } from "../services/interfaces/IMessageService";
export declare class MessageController implements IMessageController {
    private _messageService;
    constructor(_messageService: IMessageService);
    getMessages: (req: Request, res: Response) => Promise<void>;
    sendMessage: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=message.controller.d.ts.map