import { Request, Response } from "express";

export interface IChatController {
  findOrCreateChat: (req: Request, res: Response) => Promise<void>;
}
