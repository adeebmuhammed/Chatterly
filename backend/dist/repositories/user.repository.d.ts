import { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/IUserRepository";
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
}
//# sourceMappingURL=user.repository.d.ts.map