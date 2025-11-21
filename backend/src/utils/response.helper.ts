import { ApiResponse } from "../dto/common-response.dto";

export class CommonResponseHelper {
  sendSuccess = <T>(message: string, data?: T): ApiResponse<T> => {
    return {
      success: true,
      message,
      data,
    };
  };

  sendError = (message: string, error?: Error): ApiResponse<null> => {
    return {
      success: false,
      message,
      error,
    };
  };
}
