import { injectable } from "inversify";
import Users, { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/IUserRepository";

@injectable()
export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(Users);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await Users.findOne({ email: email });
  }
}
