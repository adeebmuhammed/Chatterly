"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_generator_1 = require("../utils/jwt.generator");
const constants_1 = require("../utils/constants");
const response_helper_1 = require("../utils/response.helper");
class RefreshTokenController {
    constructor() {
        this.refreshTokenController = async (req, res) => {
            const refreshToken = req.cookies["refresh-token"];
            if (!refreshToken) {
                res
                    .status(constants_1.STATUS_CODES.UNAUTHORIZED)
                    .json((0, response_helper_1.sendError)("Refresh token missing"));
                return;
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newAccessToken = (0, jwt_generator_1.generateAccessToken)({
                    userId: decoded.userId,
                });
                res.cookie("auth-token", newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 1000, // 1 hour
                });
                res.status(constants_1.STATUS_CODES.OK).json((0, response_helper_1.sendSuccess)("Access token refreshed"));
            }
            catch (error) {
                console.error(error);
                res
                    .status(constants_1.STATUS_CODES.FORBIDDEN)
                    .json((0, response_helper_1.sendError)("Invalid refresh token"));
            }
        };
    }
}
exports.refreshTokenController = new RefreshTokenController();
//# sourceMappingURL=refresh.token.controller.js.map