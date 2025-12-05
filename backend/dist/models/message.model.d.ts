import mongoose, { Document } from "mongoose";
import { FILE_TYPES } from "../utils/constants";
export interface IMessage extends Document {
    _id: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    message: string;
    messageType: FILE_TYPES;
    fileUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Messages: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, {}> & IMessage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Messages;
//# sourceMappingURL=message.model.d.ts.map