import { Request, Response } from "express";
import { IUserController } from "./interfaces/IUserController";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IUserService } from "../services/interfaces/IUserService";
import { sendError, sendSuccess } from "../utils/response.helper";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.IUserService) private _userService: IUserService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const { loginResponse } = await this._userService.login(email, password);

      res.status(STATUS_CODES.OK).json(sendSuccess(loginResponse.message));
    } catch (error) {
      res
        .status(500)
        .json(
          sendError(error instanceof Error ? error.message : "Login failed")
        );
    }
  };

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;

      const { signupResponse } = await this._userService.signup(data);

      res.status(STATUS_CODES.OK).json(sendSuccess(signupResponse.message));
    } catch (error) {
      res
        .status(500)
        .json(
          sendError(error instanceof Error ? error.message : "Signup failed")
        );
    }
  };

  verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      const { response } = await this._userService.verifyOTP(email, otp);
      let status;

      if (response) {
        status = STATUS_CODES.OK;
      } else {
        status = STATUS_CODES.CONFLICT;
      }

      res.status(status).json(response);
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(STATUS_CODES.BAD_REQUEST).json({
        error:
          error instanceof Error ? error.message : "OTP verification failed",
      });
    }
  };

  resendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          error: "Email is required",
        });
        return;
      }

      const { response } = await this._userService.resendOTP(email);
      let status;

      if (response) {
        status = STATUS_CODES.OK;
      } else {
        status = STATUS_CODES.CONFLICT;
      }

      res.status(status).json(response);
    } catch (error) {
      console.error("OTP resend error:", error);
      res.status(STATUS_CODES.BAD_REQUEST).json({
        error: error instanceof Error ? error.message : "Failed to resend OTP",
      });
    }
  };
}
