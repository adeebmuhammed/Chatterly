import { Request, Response } from "express";
import { IUserController } from "./interfaces/IUserController";
import { IUserService } from "../services/interfaces/IUserService";
export declare class UserController implements IUserController {
    private _userService;
    constructor(_userService: IUserService);
    login: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    verifyOTP: (req: Request, res: Response) => Promise<void>;
    resendOTP: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
    searchUsers: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map