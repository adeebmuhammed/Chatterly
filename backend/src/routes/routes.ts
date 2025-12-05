import { Router, Request, Response } from "express";
import { container } from "../config/inversify";
import { IUserController } from "../controllers/interfaces/IUserController";
import { TYPES } from "../config/types";
import { IChatController } from "../controllers/interfaces/IChatController";
import { IMessageController } from "../controllers/interfaces/IMessageController";

const userController = container.get<IUserController>(TYPES.IUserController);
const chatController = container.get<IChatController>(TYPES.IChatController);
const messageController = container.get<IMessageController>(
  TYPES.IMessageController
);

const routes = Router();

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

export default routes;
