import { Request, Response } from "express";
export declare const saveSubscription: (req: Request, res: Response) => Promise<void>;
export declare const sendPushToUser: (userId: string, payload: Record<string, any>) => Promise<void>;
//# sourceMappingURL=notification.d.ts.map