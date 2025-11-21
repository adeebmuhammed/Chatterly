import { Container } from "inversify";
import { IUserController } from "../controllers/interfaces/IUserController";
import { TYPES } from "./types";
import { UserController } from "../controllers/user.controller";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/user.service";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository";
import { OtpRepository } from "../repositories/otp.repository";

const container = new Container();

container.bind<IUserController>(TYPES.IUserController).to(UserController);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container.bind<IOtpRepository>(TYPES.IOtpRepository).to(OtpRepository);

export { container };
