import { MessageResponseDto } from "../../dto/base.dto";
import { UserRegisterRequestDto } from "../../dto/user.dto";

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
    response: MessageResponseDto & { user: { name: string; id: string } };
  }>;
  resendOTP(
    email: string
  ): Promise<{ response: MessageResponseDto & { user: { name: string } } }>;
}
