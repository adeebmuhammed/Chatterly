import mongoose, { Document, Schema } from "mongoose";
import { FILE_TYPES } from "../utils/constants";

export interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  message: string;
  messageType: FILE_TYPES;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: { type: String, default: "" },

    messageType: {
      type: String,
      enum: FILE_TYPES,
      default: FILE_TYPES.TEXT,
    },

    fileUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const Messages = mongoose.model<IMessage>("Messages", MessageSchema);
export default Messages;
