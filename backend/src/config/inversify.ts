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
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { ChatRepository } from "../repositories/chat.repository";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import { MessageRepository } from "../repositories/message.repository";
import { IChatController } from "../controllers/interfaces/IChatController";
import { ChatController } from "../controllers/chat.controller";
import { IChatService } from "../services/interfaces/IChatService";
import { ChatService } from "../services/chat.service";
import { IMessageService } from "../services/interfaces/IMessageService";
import { MessageService } from "../services/message.service";
import { MessageController } from "../controllers/message.controller";
import { IMessageController } from "../controllers/interfaces/IMessageController";
import { IGroupController } from "../controllers/interfaces/IGroupController";
import { GroupController } from "../controllers/group.controller";
import { IGroupService } from "../services/interfaces/IGroupService";
import { GroupService } from "../services/group.service";

const container = new Container();

container.bind<IUserController>(TYPES.IUserController).to(UserController);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container.bind<IOtpRepository>(TYPES.IOtpRepository).to(OtpRepository);

container.bind<IChatController>(TYPES.IChatController).to(ChatController);
container.bind<IChatService>(TYPES.IChatService).to(ChatService);
container.bind<IChatRepository>(TYPES.IChatRepository).to(ChatRepository);

container.bind<IMessageService>(TYPES.IMessageService).to(MessageService); 
container.bind<IMessageController>(TYPES.IMessageController).to(MessageController);
container.bind<IMessageRepository>(TYPES.IMessageRepository).to(MessageRepository);

container.bind<IGroupController>(TYPES.IGroupController).to(GroupController);
container.bind<IGroupService>(TYPES.IGroupService).to(GroupService);

export { container };
