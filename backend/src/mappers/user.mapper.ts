import { UserSearchResultDto } from "../dto/user.dto";
import { IUser } from "../models/user.model";

export class UserMapper {
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
