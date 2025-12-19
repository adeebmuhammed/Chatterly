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
exports.GroupController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const response_helper_1 = require("../utils/response.helper");
const constants_1 = require("../utils/constants");
let GroupController = class GroupController {
    constructor(_groupService) {
        this._groupService = _groupService;
    }
    async createGroup(req, res) {
        try {
            const { creatorId, userIds, groupName } = req.body;
            const { group } = await this._groupService.createGroup(creatorId, userIds, groupName);
            res
                .status(constants_1.STATUS_CODES.OK)
                .json((0, response_helper_1.sendSuccess)("Group created successfully", group));
        }
        catch (error) {
            res
                .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json((0, response_helper_1.sendError)(error instanceof Error
                ? error.message
                : "failed to create group chat"));
        }
    }
    async joinGroup(req, res) {
        try {
            const { chatId, userId } = req.body;
            const group = await this._groupService.joinGroup(chatId, userId);
            res
                .status(constants_1.STATUS_CODES.OK)
                .json((0, response_helper_1.sendSuccess)("Joined group successfully", group));
        }
        catch (error) {
            res
                .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json((0, response_helper_1.sendError)(error instanceof Error
                ? error.message
                : "failed to join group chat"));
        }
    }
    async leaveGroup(req, res) {
        try {
            const { chatId, userId } = req.body;
            const group = await this._groupService.leaveGroup(chatId, userId);
            res
                .status(constants_1.STATUS_CODES.OK)
                .json((0, response_helper_1.sendSuccess)("Left group successfully", group));
        }
        catch (error) {
            res
                .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json((0, response_helper_1.sendError)(error instanceof Error
                ? error.message
                : "failed to leave group chat"));
        }
    }
};
exports.GroupController = GroupController;
exports.GroupController = GroupController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IGroupService)),
    __metadata("design:paramtypes", [Object])
], GroupController);
//# sourceMappingURL=group.controller.js.map