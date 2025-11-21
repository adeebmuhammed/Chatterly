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
}
