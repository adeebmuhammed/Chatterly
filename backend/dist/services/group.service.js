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
exports.GroupService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const mongoose_1 = __importDefault(require("mongoose"));
let GroupService = class GroupService {
    constructor(_chatRepo, _userRepo) {
        this._chatRepo = _chatRepo;
        this._userRepo = _userRepo;
    }
    async createGroup(creatorId, userIds, groupName) {
        const creator = await this._userRepo.findById(creatorId);
        if (!creator) {
            throw new Error("Creator user not found");
        }
        for (const id of userIds) {
            const user = await this._userRepo.findById(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
        }
        const existingGroup = await this._chatRepo.findOne({
            isGroup: true,
            groupName,
        });
        if (existingGroup) {
            throw new Error("Group with the same name already exists");
        }
        const group = await this._chatRepo.create({
            participants: [
                new mongoose_1.default.Types.ObjectId(creatorId),
                ...userIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            ],
            isGroup: true,
            groupName,
            createdBy: new mongoose_1.default.Types.ObjectId(creatorId),
        });
        if (!group) {
            throw new Error("Failed to create group chat");
        }
        return { group };
    }
    async leaveGroup(chatId, userId) {
        const chat = await this._chatRepo.findById(chatId);
        if (!chat)
            throw new Error("Group not found");
        // Check if leaving user is the admin
        let isAdmin;
        if (chat.createdBy) {
            isAdmin = chat.createdBy.toString() === userId;
        }
        chat.participants = chat.participants.filter((id) => id.toString() !== userId);
        if (isAdmin && chat.participants.length > 0) {
            chat.createdBy = chat.participants[0];
        }
        let result;
        if (chat.participants.length === 0) {
            result = await this._chatRepo.deleteChatById(chatId);
            if (!result)
                throw new Error("Failed to delete empty group chat");
        }
        else {
            result = await chat.save();
        }
        return result;
    }
    async joinGroup(chatId, userId) {
        const user = await this._userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        let chat = await this._chatRepo.findById(chatId);
        if (!chat)
            throw new Error("Group not found");
        if (!chat.isGroup)
            throw new Error("Not a group chat");
        if (chat.participants.includes(new mongoose_1.default.Types.ObjectId(userId)))
            throw new Error("User already in group");
        chat = await this._chatRepo.update(chatId, {
            participants: [...chat.participants, new mongoose_1.default.Types.ObjectId(userId)],
        });
        return chat;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IChatRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object, Object])
], GroupService);
//# sourceMappingURL=group.service.js.map