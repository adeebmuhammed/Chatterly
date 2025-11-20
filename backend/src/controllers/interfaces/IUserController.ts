import { Request, Response } from "express";

export interface IUserController {
  login(req: Request, res: Response): Promise<void>;
//   signup(req: Request, res: Response): Promise<void>;
}
