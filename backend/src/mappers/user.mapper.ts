import { UserLoginResponseDto, UserSearchResultDto } from "../dto/user.dto";
import { IUser } from "../models/user.model";

export class UserMapper {
  static toUserLoginResponseDto(user: IUser, token: string): UserLoginResponseDto {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      token: token,
      message: "Login successful",
    };
  }

  static toUserSearchResultDto(user: IUser): UserSearchResultDto {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  static toUserSearchResultDtoList(users: IUser[]): UserSearchResultDto[] {
    return users.map(this.toUserSearchResultDto);
  }
}
