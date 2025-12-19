import mongoose, { Document } from "mongoose";
export interface IChat extends Document {
    _id: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
    isGroup: boolean;
    groupName?: string;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Chats: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat, {}, {}> & IChat & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Chats;
//# sourceMappingURL=chat.model.d.ts.map