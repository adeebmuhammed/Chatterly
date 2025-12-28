import webpush, { PushSubscription } from "web-push";
import { Request, Response } from "express";
import { STATUS_CODES } from "./constants";
import { sendSuccess } from "./response.helper";
import { container } from "../config/inversify";
import { TYPES } from "../config/types";
import { ISubscriptionRepository } from "../repositories/interfaces/ISubscriptionRepository";

// DI
const subscriptionRepo = container.get<ISubscriptionRepository>(
  TYPES.ISubscriptionRepository
);

// Set VAPID keys
webpush.setVapidDetails(
  "mailto:your-email@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// ---------------- SAVE SUBSCRIPTION ----------------
export const saveSubscription = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const subscription = req.body as PushSubscription;

  await subscriptionRepo.save(userId, subscription);

  res
    .status(STATUS_CODES.OK)
    .json(sendSuccess("Subscription saved successfully"));
};

// ---------------- SEND PUSH TO USER ----------------
export const sendPushToUser = async (
  userId: string,
  payload: Record<string, any>
) => {
  const sub = await subscriptionRepo.getByUser(userId);

  if (!sub) return;

  try {
    await webpush.sendNotification(sub.subscription, JSON.stringify(payload));
  } catch (error) {
    console.error("Push notification error:", error);
  }
};
