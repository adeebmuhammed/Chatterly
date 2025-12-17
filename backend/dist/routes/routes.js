"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("../config/inversify");
const types_1 = require("../config/types");
const userController = inversify_1.container.get(types_1.TYPES.IUserController);
const chatController = inversify_1.container.get(types_1.TYPES.IChatController);
const messageController = inversify_1.container.get(types_1.TYPES.IMessageController);
const routes = (0, express_1.Router)();
routes
    .post("/signup", userController.signup)
    .post("/login", userController.login)
    .post("/verify-otp", userController.verifyOTP)
    .post("/resend-otp", userController.resendOTP)
    .post("/logout", userController.logout);
routes.get("/search-users", userController.searchUsers);
routes
    .get("/chat/:userId", chatController.getUserChats)
    .post("/chat/find-or-create", chatController.findOrCreateChat);
routes
    .post("/message/send", messageController.sendMessage)
    .get("/message/:chatId", messageController.getMessages);
exports.default = routes;
//# sourceMappingURL=routes.js.map