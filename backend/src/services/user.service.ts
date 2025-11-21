import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { MessageResponseDto } from "../dto/base.dto";
import { UserRegisterRequestDto } from "../dto/user.dto";
import { IUserService } from "./interfaces/IUserService";
import { TYPES } from "../config/types";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { MESSAGES } from "../utils/constants";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../utils/validators";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository";
import otpHelper from "../utils/otp.helper";
import mongoose from "mongoose";
import { BaseMapper } from "../mappers/base.mapper";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepo: IUserRepository,
    @inject(TYPES.IOtpRepository) private _otpRepo: IOtpRepository
  ) {}

  login = async (
    email: string,
    password: string
  ): Promise<{ loginResponse: MessageResponseDto }> => {
    if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!password) {
      throw new Error("password is required");
    }

    const user = await this._userRepo.findByEmail(email);

    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }

    if (!user.password) {
      throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    const loginResponse: MessageResponseDto = BaseMapper.toMessageResponse(
      MESSAGES.SUCCESS.LOGIN
    );

    return {
      loginResponse,
    };
  };

  signup = async (
    userData: UserRegisterRequestDto
  ): Promise<{ signupResponse: MessageResponseDto }> => {
    const { name, email, password, confirmPassword, phone } = userData;

    if (!name || !email || !password || !confirmPassword || !phone) {
      throw new Error(MESSAGES.ERROR.INVALID_INPUT_SIGNUP);
    }

    if (!isValidEmail(email)) {
      throw new Error(MESSAGES.ERROR.INVALID_EMAIL);
    }

    if (!isValidPhone(phone)) {
      throw new Error(MESSAGES.ERROR.INVALID_PHONE);
    }

    if (!isValidPassword(password)) {
      throw new Error(MESSAGES.ERROR.INVALID_PASSWORD);
    }

    if (password !== confirmPassword) {
      throw new Error(MESSAGES.ERROR.PASSWORD_MISMATCH);
    }

    const existingUser = await this._userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error(MESSAGES.ERROR.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = otpHelper.generateOTP();

    await otpHelper.sendOTP(email, otp);
    console.log(otp);

    const user = await this._userRepo.create({
      ...userData,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error(MESSAGES.ERROR.CREATION_FAILED);
    }

    const otpCreated = await this._otpRepo.create({
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      userId: user._id,
    });

    if (!otpCreated) {
      throw new Error("otp generation failed");
    }

    return {
      signupResponse: BaseMapper.toMessageResponse(MESSAGES.SUCCESS.SIGNUP),
    };
  };
}
