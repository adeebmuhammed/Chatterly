import { Request, Response } from "express";

export interface IUserController {
  login(req: Request, res: Response): Promise<void>;
  signup(req: Request, res: Response): Promise<void>;
  verifyOTP(req: Request, res: Response): Promise<void>;
  resendOTP(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;

  searchUsers(req: Request, res: Response): Promise<void>;
}
