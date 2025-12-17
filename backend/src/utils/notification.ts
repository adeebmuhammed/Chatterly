import webpush from "web-push";
import { Request, Response } from "express";
import { STATUS_CODES } from "./constants";
import { sendSuccess } from "./response.helper";

// Set VAPID keys
webpush.setVapidDetails(
  "mailto:your-email@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscriptions: any[] = []; // Ideally store in DB

export const saveSubscription = (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(STATUS_CODES.OK).json(sendSuccess("Subscription saved successfully"));
};

// Function to send push notification
export const sendPushNotification = (payload: any) => {
  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, JSON.stringify(payload)).catch(console.error);
  });
};
