"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const mongoose_1 = __importDefault(require("mongoose"));
let MessageService = class MessageService {
    constructor(_messageRepo, _chatRepo) {
        this._messageRepo = _messageRepo;
        this._chatRepo = _chatRepo;
        this.sendMessage = async (chatId, senderId, message) => {
            const chat = await this._chatRepo.findById(chatId);
            if (!chat) {
                throw new Error("Chat not found");
            }
            const sendMessageResponse = await this._messageRepo.create({
                chatId: new mongoose_1.default.Types.ObjectId(chatId),
                sender: new mongoose_1.default.Types.ObjectId(senderId),
                message,
            });
            return { sendMessageResponse };
        };
        this.getMessages = async (chatId) => {
            const getMessagesResponse = await this._messageRepo.getMessagesByChat(chatId);
            return { getMessagesResponse };
        };
        this.deleteMessage = async (messageId) => {
            const message = this._messageRepo.findById(messageId);
            if (!message) {
                throw new Error("message not found");
            }
            const deleted = await this._messageRepo.deleteMessageById(messageId);
            if (!deleted) {
                throw new Error("failed to delete message");
            }
            const deleteMessageResponse = {
                message: "message deleted successfully",
            };
            return { deleteMessageResponse };
        };
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMessageRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IChatRepository)),
    __metadata("design:paramtypes", [Object, Object])
], MessageService);
//# sourceMappingURL=message.service.js.map