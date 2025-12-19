import { IChatController } from "./interfaces/IChatController";
import { Request, Response } from "express";
import { IChatService } from "../services/interfaces/IChatService";
export declare class ChatController implements IChatController {
    private _chatService;
    constructor(_chatService: IChatService);
    getUserChats: (req: Request, res: Response) => Promise<void>;
    findOrCreateChat: (req: Request, res: Response) => Promise<void>;
    searchGroupChats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=chat.controller.d.ts.map