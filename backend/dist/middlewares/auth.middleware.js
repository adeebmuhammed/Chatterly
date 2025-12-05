"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const authMiddleware = () => {
    return async (req, res, next) => {
        const token = req.cookies["auth-token"];
        if (!token) {
            res
                .status(constants_1.STATUS_CODES.UNAUTHORIZED)
                .json({ message: constants_1.MESSAGES.ERROR.UNAUTHORIZED });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
        catch (error) {
            console.error(error);
            res
                .status(constants_1.STATUS_CODES.UNAUTHORIZED)
                .json({ message: constants_1.MESSAGES.ERROR.INVALID_TOKEN });
            return;
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map