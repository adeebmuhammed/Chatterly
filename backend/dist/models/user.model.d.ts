import mongoose, { Document } from "mongoose";
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
declare const Users: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Users;
//# sourceMappingURL=user.model.d.ts.map