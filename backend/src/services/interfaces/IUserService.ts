import { MessageResponseDto } from "../../dto/base.dto";
import {
  UserLoginResponseDto,
  UserRegisterRequestDto,
  UserSearchResultDto,
} from "../../dto/user.dto";

export interface IUserService {
  login(
    email: string,
    password: string
  ): Promise<{ loginResponse: UserLoginResponseDto }>;
  signup(
    userData: UserRegisterRequestDto
  ): Promise<{ signupResponse: MessageResponseDto }>;
  verifyOTP(
    email: string,
    otp: string
  ): Promise<{
    verifyOTPResponse: MessageResponseDto & {
      user: { name: string; id: string };
    };
  }>;
  resendOTP(email: string): Promise<{
    resendOTPResponse: MessageResponseDto & { user: { name: string } };
  }>;
  searchUsers(query: string): Promise<{ users: UserSearchResultDto[] }>;
}
