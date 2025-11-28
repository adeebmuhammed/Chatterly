import mongoose, { Document, Schema } from "mongoose";
import { USER_ACTIVE_STATUS } from "../utils/constants";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  status: USER_ACTIVE_STATUS;
  lastSeen: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String, trim: true, default: null },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: USER_ACTIVE_STATUS, default: USER_ACTIVE_STATUS.OFFLINE },
    lastSeen: { type: Date, default: null }
  },
  { timestamps: true }
);

const Users = mongoose.model<IUser>("Users", UserSchema);
export default Users;