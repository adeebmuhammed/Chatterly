import { MessageResponseDto } from "../../dto/base.dto";
import { IMessage } from "../../models/message.model";
import { FILE_TYPES } from "../../utils/constants";
export interface IMessageService {
    sendMessage(chatId: string, senderId: string, message?: string, mediaUrl?: string, messageType?: FILE_TYPES): Promise<{
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