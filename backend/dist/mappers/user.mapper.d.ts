import { UserLoginResponseDto, UserSearchResultDto } from "../dto/user.dto";
import { IUser } from "../models/user.model";
export declare class UserMapper {
    static toUserLoginResponseDto(user: IUser, token: string): UserLoginResponseDto;
    static toUserSearchResultDto(user: IUser): UserSearchResultDto;
    static toUserSearchResultDtoList(users: IUser[]): UserSearchResultDto[];
}
//# sourceMappingURL=user.mapper.d.ts.map