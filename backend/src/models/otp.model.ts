import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document {
  otp: string | null;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

const OtpSchema: Schema = new Schema(
  {
    otp: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
      index: { expires: "0s" },
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;