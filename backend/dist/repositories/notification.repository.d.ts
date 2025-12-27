import { BaseRepository } from "./base.repository";
import { INotification } from "../models/notification.model";
import { INotificationRepository } from "./interfaces/INotificationRepository";
import { NOTIFICATION_TYPE } from "../utils/constants";
export declare class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
    constructor();
    createNotification: ({ userId, title, body, chatId, senderId, type, }: {
        userId: string;
        title: string;
        body: string;
        chatId?: string;
        senderId?: string;
        type?: NOTIFICATION_TYPE;
    }) => Promise<import("mongoose").Document<unknown, {}, INotification, {}, {}> & INotification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=notification.repository.d.ts.map