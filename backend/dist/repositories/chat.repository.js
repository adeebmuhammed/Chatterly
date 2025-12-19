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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const inversify_1 = require("inversify");
const base_repository_1 = require("./base.repository");
const chat_model_1 = __importDefault(require("../models/chat.model"));
const mongoose_1 = __importDefault(require("mongoose"));
let ChatRepository = class ChatRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(chat_model_1.default);
    }
    async findOrCreateOneOnOne(user1, user2) {
        let chat = await chat_model_1.default.findOne({
            isGroup: false,
            participants: { $all: [user1, user2] },
        })
            .populate("participants", "name email status lastSeen")
            .exec();
        // Create if not exists
        if (!chat) {
            chat = await chat_model_1.default.create({
                participants: [user1, user2],
                isGroup: false,
            });
            chat = await chat_model_1.default.findById(chat._id)
                .populate("participants", "name email status lastSeen")
                .exec();
            if (!chat) {
                throw new Error("Failed to create chat");
            }
        }
        return chat;
    }
    async getUserChats(userId) {
        return chat_model_1.default.aggregate([
            // 1️⃣ Only chats where user is a participant
            {
                $match: {
                    participants: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            // 2️⃣ Lookup last message
            {
                $lookup: {
                    from: "messages",
                    let: { chatId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$chatId", "$$chatId"] },
                            },
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 },
                    ],
                    as: "lastMessage",
                },
            },
            // 3️⃣ Flatten lastMessage array
            {
                $unwind: {
                    path: "$lastMessage",
                    preserveNullAndEmptyArrays: true,
                },
            },
            // 4️⃣ Populate participants
            {
                $lookup: {
                    from: "users",
                    localField: "participants",
                    foreignField: "_id",
                    as: "participants",
                },
            },
            // 5️⃣ Shape final output
            {
                $project: {
                    participants: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        status: 1,
                        lastSeen: 1,
                    },
                    isGroup: 1,
                    groupName: 1,
                    createdBy: 1,
                    updatedAt: 1,
                    lastMessage: "$lastMessage.message",
                    lastMessageSender: "$lastMessage.sender",
                    lastMessageAt: "$lastMessage.createdAt",
                },
            },
            // 6️⃣ Sort chats by last activity
            {
                $sort: {
                    lastMessageAt: -1,
                    updatedAt: -1,
                },
            },
        ]);
    }
    async deleteChatById(chatId) {
        const result = await chat_model_1.default.findByIdAndDelete(chatId).exec();
        return result;
    }
    async searchGroupChats(query) {
        const groups = await chat_model_1.default.find({
            isGroup: true,
            groupName: { $regex: query, $options: "i" },
        })
            .populate("createdBy", "name email")
            .exec();
        return groups;
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ChatRepository);
//# sourceMappingURL=chat.repository.js.map