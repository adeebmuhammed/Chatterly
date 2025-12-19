"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("../config/inversify");
const types_1 = require("../config/types");
const notification_1 = require("../utils/notification");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userController = inversify_1.container.get(types_1.TYPES.IUserController);
const chatController = inversify_1.container.get(types_1.TYPES.IChatController);
const messageController = inversify_1.container.get(types_1.TYPES.IMessageController);
const groupController = inversify_1.container.get(types_1.TYPES.IGroupController);
const routes = (0, express_1.Router)();
const userAuth = (0, auth_middleware_1.authMiddleware)();
routes
    .post("/signup", userController.signup)
    .post("/login", userController.login)
    .post("/verify-otp", userController.verifyOTP)
    .post("/resend-otp", userController.resendOTP)
    .post("/logout", userController.logout);
routes.get("/search-users", userAuth, userController.searchUsers);
routes
    .get("/chat/:userId", userAuth, chatController.getUserChats)
    .post("/chat/find-or-create", userAuth, chatController.findOrCreateChat)
    .get("/group/search", userAuth, chatController.searchGroupChats);
routes
    .post("/message/send", userAuth, messageController.sendMessage)
    .get("/message/:chatId", userAuth, messageController.getMessages)
    .delete("/message/:messageId", userAuth, messageController.deleteMessage);
routes.post("/group/create", userAuth, groupController.createGroup.bind(groupController));
routes.patch("/group/join", userAuth, groupController.joinGroup.bind(groupController));
routes.patch("/group/leave", userAuth, groupController.leaveGroup.bind(groupController));
routes.post("/notifications/subscribe", notification_1.saveSubscription);
exports.default = routes;
//# sourceMappingURL=routes.js.map