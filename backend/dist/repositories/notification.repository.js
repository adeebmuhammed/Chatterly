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
exports.NotificationRepository = void 0;
const inversify_1 = require("inversify");
const base_repository_1 = require("./base.repository");
const notification_model_1 = __importDefault(require("../models/notification.model"));
const constants_1 = require("../utils/constants");
let NotificationRepository = class NotificationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(notification_model_1.default);
    }
    async createNotification({ userId, title, body, chatId, senderId, type = constants_1.NOTIFICATION_TYPE.MESSAGE, }) {
        return notification_model_1.default.create({
            user: userId,
            title,
            body,
            chatId,
            sender: senderId,
            type,
        });
    }
    ;
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], NotificationRepository);
//# sourceMappingURL=notification.repository.js.map