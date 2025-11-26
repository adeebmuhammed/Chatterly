import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth-token"];

    if (!token) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSAGES.ERROR.UNAUTHORIZED });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      (req as AuthenticatedRequest).userId = decoded.userId;

      next();
    } catch (error) {
      console.error(error);
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSAGES.ERROR.INVALID_TOKEN });

      return;
    }
  };
};
