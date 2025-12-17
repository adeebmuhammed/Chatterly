import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import { IMessage } from "../models/message.model";
import { IMessageService } from "./interfaces/IMessageService";
export declare class MessageService implements IMessageService {
    private _messageRepo;
    constructor(_messageRepo: IMessageRepository);
    sendMessage: (chatId: string, senderId: string, message: string) => Promise<{
        sendMessageResponse: IMessage;
    }>;
    getMessages: (chatId: string) => Promise<{
        getMessagesResponse: IMessage[];
    }>;
}
//# sourceMappingURL=message.service.d.ts.map