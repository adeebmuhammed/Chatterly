import { Request, Response, NextFunction } from "express";
export interface AuthenticatedRequest extends Request {
    userId: string;
}
export declare const authMiddleware: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map