import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  isGroup: boolean;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
      }
    ],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, default: null },
  },
  { timestamps: true }
);

const Chats = mongoose.model<IChat>("Chats", ChatSchema);
export default Chats;
