import { Request, Response } from "express";

export interface IChatController {
  findOrCreateChat: (req: Request, res: Response) => Promise<void>;
  getUserChats(req: Request, res: Response): Promise<void>;
  searchGroupChats(req: Request, res: Response): Promise<void>;
}
