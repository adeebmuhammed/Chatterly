import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import { IMessage } from "../models/message.model";
import { IMessageService } from "./interfaces/IMessageService";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { MessageResponseDto } from "../dto/base.dto";
export declare class MessageService implements IMessageService {
    private _messageRepo;
    private _chatRepo;
    constructor(_messageRepo: IMessageRepository, _chatRepo: IChatRepository);
    sendMessage: (chatId: string, senderId: string, message: string) => Promise<{
        sendMessageResponse: IMessage;
    }>;
    getMessages: (chatId: string) => Promise<{
        getMessagesResponse: IMessage[];
    }>;
    deleteMessage: (messageId: string) => Promise<{
        deleteMessageResponse: MessageResponseDto;
    }>;
}
//# sourceMappingURL=message.service.d.ts.map