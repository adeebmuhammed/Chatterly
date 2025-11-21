import { Request, Response } from "express";
import { IUserController } from "./interfaces/IUserController";
import { injectable } from "inversify";


@injectable()
export class UserController implements IUserController {
    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
        } catch (error) {
            
        }
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body;
        } catch (error) {
            
        }
    }
}