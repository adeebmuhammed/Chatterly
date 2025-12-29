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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../utils/constants");
const response_helper_1 = require("../utils/response.helper");
const types_1 = require("../config/types");
let MessageController = class MessageController {
    constructor(_messageService) {
        this._messageService = _messageService;
        this.getMessages = async (req, res) => {
            try {
                const { chatId } = req.params;
                const { getMessagesResponse } = await this._messageService.getMessages(chatId);
                res
                    .status(constants_1.STATUS_CODES.OK)
                    .json((0, response_helper_1.sendSuccess)("Messages fetched successfully", getMessagesResponse));
            }
            catch (error) {
                res
                    .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json((0, response_helper_1.sendError)("Error fetching messages", error));
            }
        };
        this.sendMessage = async (req, res) => {
            try {
                const { chatId, senderId, message, mediaUrl, messageType } = req.body;
                const { sendMessageResponse } = await this._messageService.sendMessage(chatId, senderId, message, mediaUrl, messageType);
                res
                    .status(constants_1.STATUS_CODES.OK)
                    .json((0, response_helper_1.sendSuccess)("Message sent successfully", sendMessageResponse));
            }
            catch (error) {
                res
                    .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json((0, response_helper_1.sendError)("Error sending message", error));
            }
        };
        this.deleteMessage = async (req, res) => {
            try {
                const messageId = req.params["messageId"];
                const { deleteMessageResponse } = await this._messageService.deleteMessage(messageId);
                res
                    .status(constants_1.STATUS_CODES.OK)
                    .json((0, response_helper_1.sendSuccess)(deleteMessageResponse.message));
            }
            catch (error) {
                res
                    .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json((0, response_helper_1.sendError)("Error deleting message", error));
            }
        };
    }
};
exports.MessageController = MessageController;
exports.MessageController = MessageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMessageService)),
    __metadata("design:paramtypes", [Object])
], MessageController);
//# sourceMappingURL=message.controller.js.map