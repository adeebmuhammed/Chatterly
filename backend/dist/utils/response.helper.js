"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (message, data) => {
    return {
        success: true,
        message,
        data,
    };
};
exports.sendSuccess = sendSuccess;
const sendError = (message, error) => {
    return {
        success: false,
        message,
        error,
    };
};
exports.sendError = sendError;
//# sourceMappingURL=response.helper.js.map