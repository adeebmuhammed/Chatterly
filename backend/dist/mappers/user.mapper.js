"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toUserLoginResponseDto(user, token) {
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
    static toUserSearchResultDto(user) {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    }
    static toUserSearchResultDtoList(users) {
        return users.map(this.toUserSearchResultDto);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map