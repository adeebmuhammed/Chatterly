export declare class UserRegisterRequestDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
}
export declare class UserLoginResponseDto {
    id: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
    token: string;
    message: string;
}
export declare class UserSearchResultDto {
    id: string;
    name: string;
    email: string;
}
//# sourceMappingURL=user.dto.d.ts.map