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
exports.ChatController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const response_helper_1 = require("../utils/response.helper");
let ChatController = class ChatController {
    constructor(_chatService) {
        this._chatService = _chatService;
        this.getUserChats = async (req, res) => {
            try {
                const userId = req.params.userId;
                const { userChats } = await this._chatService.getUserChats(userId);
                res.status(200).json((0, response_helper_1.sendSuccess)("Chats fetched successfully", userChats));
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching chats", error });
            }
        };
        this.findOrCreateChat = async (req, res) => {
            try {
                const { userId, otherUserId } = req.body;
                const { findOrCreateChatResponse } = await this._chatService.findOrCreateChat(userId, otherUserId);
                res
                    .status(200)
                    .json((0, response_helper_1.sendSuccess)("Conversation found or created successfully", findOrCreateChatResponse));
            }
            catch (error) {
                res.status(500).json({ message: "Error finding conversation", error });
            }
        };
    }
};
exports.ChatController = ChatController;
exports.ChatController = ChatController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IChatService)),
    __metadata("design:paramtypes", [Object])
], ChatController);
//# sourceMappingURL=chat.controller.js.map