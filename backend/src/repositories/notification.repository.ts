import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import Notification, { INotification } from "../models/notification.model";
import { INotificationRepository } from "./interfaces/INotificationRepository";
import { NOTIFICATION_TYPE } from "../utils/constants";

@injectable()
export class NotificationRepository
  extends BaseRepository<INotification>
  implements INotificationRepository
{
  constructor() {
    super(Notification);
  }

  async createNotification({
    userId,
    title,
    body,
    chatId,
    senderId,
    type = NOTIFICATION_TYPE.MESSAGE,
  }: {
    userId: string;
    title: string;
    body: string;
    chatId?: string;
    senderId?: string;
    type?: NOTIFICATION_TYPE;
  }): Promise<INotification> {
    return Notification.create({
      user: userId,
      title,
      body,
      chatId,
      sender: senderId,
      type,
    });
  };
}
