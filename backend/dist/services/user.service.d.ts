import { MessageResponseDto } from "../dto/base.dto";
import { UserLoginResponseDto, UserRegisterRequestDto, UserSearchResultDto } from "../dto/user.dto";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository";
export declare class UserService implements IUserService {
    private _userRepo;
    private _otpRepo;
    constructor(_userRepo: IUserRepository, _otpRepo: IOtpRepository);
    login: (email: string, password: string) => Promise<{
        loginResponse: UserLoginResponseDto;
    }>;
    signup: (userData: UserRegisterRequestDto) => Promise<{
        signupResponse: MessageResponseDto;
    }>;
    verifyOTP: (email: string, otp: string) => Promise<{
        verifyOTPResponse: MessageResponseDto & {
            user: {
                name: string;
                id: string;
            };
        };
    }>;
    resendOTP: (email: string) => Promise<{
        resendOTPResponse: MessageResponseDto & {
            user: {
                name: string;
                email: string;
            };
        };
    }>;
    searchUsers: (query: string) => Promise<{
        users: UserSearchResultDto[];
    }>;
}
//# sourceMappingURL=user.service.d.ts.map