import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { MessageResponseDto } from "../dto/base.dto";
import { UserRegisterRequestDto } from "../dto/user.dto";
import { IUserService } from "./interfaces/IUserService";
import { TYPES } from "../config/types";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { MESSAGES } from "../utils/constants";
import { isValidEmail, isValidPassword, isValidPhone } from "../utils/validators";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepo: IUserRepository
  ) {}

  // login = async (email: string, password: string): Promise<{ loginResponse: MessageResponseDto; }> => {

  // }

  signup = async (
    userData: UserRegisterRequestDto
  ): Promise<{ loginResponse: MessageResponseDto }> => {
    const { name, email, password, confirmPassword, phone } = userData;

    if (!name || !email || !password || !confirmPassword || !phone) {
      throw new Error(MESSAGES.ERROR.INVALID_INPUT_SIGNUP);
    }

    if (!isValidEmail(email)) {
        throw new Error(MESSAGES.ERROR.INVALID_EMAIL)
    }

    if (!isValidPhone(phone)) {
        throw new Error(MESSAGES.ERROR.INVALID_PHONE)
    }

    if (!isValidPassword(password)) {
        throw new Error(MESSAGES.ERROR.INVALID_PASSWORD)
    }

    if (password !== confirmPassword) {
      throw new Error(MESSAGES.ERROR.PASSWORD_MISMATCH);
    }

    const existingUser = await this._userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error(MESSAGES.ERROR.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return{
        loginResponse: { message: "success"}
    }
  };
}
