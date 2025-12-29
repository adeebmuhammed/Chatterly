import { INotification } from "../../models/notification.model";
import { NOTIFICATION_TYPE } from "../../utils/constants";
import { IBaseRepository } from "./IBaseRepository";
export interface INotificationRepository extends IBaseRepository<INotification> {
    createNotification({ userId, title, body, chatId, senderId, type, }: {
        userId: string;
        title: string;
        body: string;
        chatId?: string;
        senderId?: string;
        type?: NOTIFICATION_TYPE;
    }): Promise<INotification>;
}
//# sourceMappingURL=INotificationRepository.d.ts.map