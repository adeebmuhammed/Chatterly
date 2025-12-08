import { Router, Request, Response } from "express";
import { container } from "../config/inversify";
import { IUserController } from "../controllers/interfaces/IUserController";
import { TYPES } from "../config/types";
import { IChatController } from "../controllers/interfaces/IChatController";
import { IMessageController } from "../controllers/interfaces/IMessageController";
import { saveSubscription } from "../utils/notification";
import { IGroupController } from "../controllers/interfaces/IGroupController";
import { authMiddleware } from "../middlewares/auth.middleware";

const userController = container.get<IUserController>(TYPES.IUserController);
const chatController = container.get<IChatController>(TYPES.IChatController);
const messageController = container.get<IMessageController>(
  TYPES.IMessageController
);
const groupController = container.get<IGroupController>(TYPES.IGroupController);

const routes = Router();
const userAuth = authMiddleware();

routes
  .post("/signup", userController.signup)
  .post("/login", userController.login)
  .post("/verify-otp", userController.verifyOTP)
  .post("/resend-otp", userController.resendOTP)
  .post("/logout", userController.logout);

routes.get("/search-users", userAuth, userController.searchUsers);

routes
  .get("/chat/:userId", userAuth,chatController.getUserChats)
  .post("/chat/find-or-create", userAuth,chatController.findOrCreateChat)
  .get("/group/search", userAuth,chatController.searchGroupChats);

routes
  .post("/message/send", userAuth,messageController.sendMessage)
  .get("/message/:chatId", userAuth,messageController.getMessages);

routes.post("/group/create", userAuth,groupController.createGroup.bind(groupController));
routes.patch("/group/join", userAuth,groupController.joinGroup.bind(groupController));
routes.patch("/group/leave", userAuth,groupController.leaveGroup.bind(groupController));

routes.post("/notifications/subscribe", saveSubscription);

export default routes;
