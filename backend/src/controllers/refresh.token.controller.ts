import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { generateAccessToken } from "../utils/jwt.generator";
import { STATUS_CODES } from "../utils/constants";
import { sendError, sendSuccess } from "../utils/response.helper";

class RefreshTokenController {
  refreshTokenController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json(sendError("Refresh token missing"));
      return;
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as {
        userId: string;
      };

      const newAccessToken = generateAccessToken({
        userId: decoded.userId,
      });

      res.cookie("auth-token", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.status(STATUS_CODES.OK).json(sendSuccess("Access token refreshed"));
    } catch (error) {
      console.error(error);
      res
        .status(STATUS_CODES.FORBIDDEN)
        .json(sendError("Invalid refresh token"));
    }
  };
}

export const refreshTokenController = new RefreshTokenController();
