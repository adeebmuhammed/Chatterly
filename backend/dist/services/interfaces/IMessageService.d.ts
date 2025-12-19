import { MessageResponseDto } from "../../dto/base.dto";
import { IMessage } from "../../models/message.model";
export interface IMessageService {
    sendMessage(chatId: string, senderId: string, message: string): Promise<{
        sendMessageResponse: IMessage;
    }>;
    getMessages(chatId: string): Promise<{
        getMessagesResponse: IMessage[];
    }>;
    deleteMessage(messageId: string): Promise<{
        deleteMessageResponse: MessageResponseDto;
    }>;
}
//# sourceMappingURL=IMessageService.d.ts.map