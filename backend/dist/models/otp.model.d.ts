import mongoose, { Document } from "mongoose";
export interface IOtp extends Document {
    otp: string | null;
    userId: mongoose.Types.ObjectId;
    expiresAt: Date;
}
declare const Otp: mongoose.Model<IOtp, {}, {}, {}, mongoose.Document<unknown, {}, IOtp, {}, {}> & IOtp & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Otp;
//# sourceMappingURL=otp.model.d.ts.map