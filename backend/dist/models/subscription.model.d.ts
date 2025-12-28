import mongoose, { Document } from "mongoose";
import { PushSubscription } from "web-push";
export interface ISubscription extends Document {
    user: mongoose.Types.ObjectId;
    subscription: PushSubscription;
}
declare const Subscription: mongoose.Model<ISubscription, {}, {}, {}, mongoose.Document<unknown, {}, ISubscription, {}, {}> & ISubscription & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Subscription;
//# sourceMappingURL=subscription.model.d.ts.map