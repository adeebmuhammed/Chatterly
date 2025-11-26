import { Router, Request,Response} from "express";
import { container } from "../config/inversify";
import { IUserController } from "../controllers/interfaces/IUserController";
import { TYPES } from "../config/types";

const userController = container.get<IUserController>(TYPES.IUserController)

const routes = Router();

routes
.post("/signup", userController.signup)
.post("/login", userController.login)
.post('/verify-otp',userController.verifyOTP)
.post('/resend-otp',userController.resendOTP)
.post('/logout',userController.logout)

export default routes;