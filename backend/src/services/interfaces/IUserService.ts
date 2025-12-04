import { MessageResponseDto } from "../../dto/base.dto";
import { UserRegisterRequestDto, UserSearchResultDto } from "../../dto/user.dto";
import { IUser } from "../../models/user.model";

export interface IUserService {
  login(
    email: string,
    password: string
  ): Promise<{ loginResponse: MessageResponseDto }>;
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
  resendOTP(
    email: string
  ): Promise<{
    resendOTPResponse: MessageResponseDto & { user: { name: string } };
  }>;
  searchUsers(query: string): Promise<{ users: UserSearchResultDto[] }>;
}
