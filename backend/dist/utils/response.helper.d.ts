import { ApiResponse } from "../dto/common-response.dto";
export declare const sendSuccess: <T>(message: string, data?: T) => ApiResponse<T>;
export declare const sendError: (message: string, error?: any) => ApiResponse<null>;
//# sourceMappingURL=response.helper.d.ts.map