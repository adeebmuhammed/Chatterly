import mongoose, { Document, Schema } from "mongoose";
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

const NotificationSchema = new Schema<INotification>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      required: true,
    },

    title: { type: String, required: true },
    body: { type: String, required: true },

    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
      default: null,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notifications",
  NotificationSchema
);

export default Notification;
