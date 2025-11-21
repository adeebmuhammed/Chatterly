import { Router, Request,Response} from "express";
import { container } from "../config/inversify";
import { IUserController } from "../controllers/interfaces/IUserController";
import { TYPES } from "../config/types";

const userController = container.get<IUserController>(TYPES.IUserController)

const routes = Router();

routes.get("/", (req:Request, res: Response)=>{
    res.send("on")
})
routes
.post("/signup", userController.signup)
.post("/login", userController.login)

export default routes;