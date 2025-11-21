import { ApiResponse } from "../dto/common-response.dto";

export const sendSuccess = <T>(
    message: string,
    data?: T
): ApiResponse<T> => {
    return {
        success: true,
        message,
        data,
    };
};

export const sendError = (
    message: string,
    error?: any
): ApiResponse<null> => {
    return {
        success: false,
        message,
        error,
    };
};
