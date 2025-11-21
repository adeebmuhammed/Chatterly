import { MessageResponseDto } from "../dto/base.dto";

export class BaseMapper {
  static toMessageResponse(message: string): MessageResponseDto {
    return { message };
  }
}
