import mongoose, { Document } from "mongoose";
import { NOTIFICATION_TYPE } from "../utils/constants";
export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: NOTIFICATION_TYPE;
    title: string;
    body: string;
    chatId?: mongoose.Types.ObjectId;
    sender?: mongoose.Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
}
declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, {}> & INotification & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Notification;
//# sourceMappingURL=notification.model.d.ts.map