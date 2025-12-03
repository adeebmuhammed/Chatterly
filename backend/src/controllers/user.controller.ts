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
      const { verifyOTPResponse } = await this._userService.verifyOTP(
        email,
        otp
      );
      let status;

      if (verifyOTPResponse) {
        status = STATUS_CODES.OK;
      } else {
        status = STATUS_CODES.CONFLICT;
      }

      res.status(status).json(verifyOTPResponse);
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

      const { resendOTPResponse } = await this._userService.resendOTP(email);
      let status;

      if (resendOTPResponse) {
        status = STATUS_CODES.OK;
      } else {
        status = STATUS_CODES.CONFLICT;
      }

      res
        .status(status)
        .json(sendSuccess(resendOTPResponse.message, resendOTPResponse.user));
    } catch (error) {
      console.error("OTP resend error:", error);
      res.status(STATUS_CODES.BAD_REQUEST).json({
        error: error instanceof Error ? error.message : "Failed to resend OTP",
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("auth-token", { path: "/" });
    res.clearCookie("refresh-token", { path: "/" });

    res.status(STATUS_CODES.OK).json(sendSuccess("logged out successfully"));
  };

  searchUsers = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;

      const { users } = await this._userService.searchUsers(query);

      if (users.length < 1) {
        res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(sendError("Users Not Found"));
      } else {
        res.status(200).json(sendSuccess("Users fetched successfully", users));
      }
    } catch (error) {
      res.status(500).json({ message: "Error searching users", error });
    }
  };
}
