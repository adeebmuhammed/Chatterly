import mongoose, { Document, Schema } from "mongoose";
import { PushSubscription } from "web-push";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId;
  subscription: PushSubscription;
}

const PushSubscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
    subscription: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model<ISubscription>(
  "PushSubscriptions",
  PushSubscriptionSchema
);

export default Subscription;