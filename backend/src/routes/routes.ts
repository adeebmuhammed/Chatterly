import { Router,Request,Response } from "express";

const routes = Router();

routes.get("/",(req: Request,res: Response):void =>{
    res.json({"message": "voila!"})
})

export default routes;