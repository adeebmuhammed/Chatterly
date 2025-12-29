"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const response_helper_1 = require("../utils/response.helper");
const constants_1 = require("../utils/constants");
const jwt_generator_1 = require("../utils/jwt.generator");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { loginResponse } = await this._userService.login(email, password);
                const refreshToken = (0, jwt_generator_1.generateRefreshToken)({ userId: loginResponse.id });
                res.cookie("auth-token", loginResponse.token, {
                    httpOnly: true,
                    secure: true, // REQUIRED
                    sameSite: "none", // REQUIRED
                    path: "/",
                    maxAge: 1000 * 60 * 60, // 1 hour
                });
                res.cookie("refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    path: "/",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                res
                    .status(constants_1.STATUS_CODES.OK)
                    .json((0, response_helper_1.sendSuccess)(loginResponse.message, loginResponse));
            }
            catch (error) {
                res
                    .status(500)
                    .json((0, response_helper_1.sendError)(error instanceof Error ? error.message : "Login failed"));
            }
        };
        this.signup = async (req, res) => {
            try {
                const data = req.body;
                const { signupResponse } = await this._userService.signup(data);
                res.status(constants_1.STATUS_CODES.OK).json((0, response_helper_1.sendSuccess)(signupResponse.message));
            }
            catch (error) {
                res
                    .status(500)
                    .json((0, response_helper_1.sendError)(error instanceof Error ? error.message : "Signup failed"));
            }
        };
        this.verifyOTP = async (req, res) => {
            try {
                const { email, otp } = req.body;
                const { verifyOTPResponse } = await this._userService.verifyOTP(email, otp);
                let status;
                if (verifyOTPResponse) {
                    status = constants_1.STATUS_CODES.OK;
                }
                else {
                    status = constants_1.STATUS_CODES.CONFLICT;
                }
                res.status(status).json(verifyOTPResponse);
            }
            catch (error) {
                console.error("OTP verification error:", error);
                res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({
                    error: error instanceof Error ? error.message : "OTP verification failed",
                });
            }
        };
        this.resendOTP = async (req, res) => {
            try {
                const { email } = req.body;
                if (!email) {
                    res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({
                        error: "Email is required",
                    });
                    return;
                }
                const { resendOTPResponse } = await this._userService.resendOTP(email);
                let status;
                if (resendOTPResponse) {
                    status = constants_1.STATUS_CODES.OK;
                }
                else {
                    status = constants_1.STATUS_CODES.CONFLICT;
                }
                res
                    .status(status)
                    .json((0, response_helper_1.sendSuccess)(resendOTPResponse.message, resendOTPResponse.user));
            }
            catch (error) {
                console.error("OTP resend error:", error);
                res.status(constants_1.STATUS_CODES.BAD_REQUEST).json({
                    error: error instanceof Error ? error.message : "Failed to resend OTP",
                });
            }
        };
        this.logout = async (req, res) => {
            res.clearCookie("auth-token", { path: "/" });
            res.clearCookie("refresh-token", { path: "/" });
            res.status(constants_1.STATUS_CODES.OK).json((0, response_helper_1.sendSuccess)("logged out successfully"));
        };
        this.searchUsers = async (req, res) => {
            try {
                const query = req.query.q;
                const { users } = await this._userService.searchUsers(query);
                if (users.length < 1) {
                    res
                        .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                        .json((0, response_helper_1.sendError)("Users Not Found"));
                }
                else {
                    res
                        .status(constants_1.STATUS_CODES.OK)
                        .json((0, response_helper_1.sendSuccess)("Users fetched successfully", users));
                }
            }
            catch (error) {
                res
                    .status(constants_1.STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json((0, response_helper_1.sendError)("Error Searching Users"));
            }
        };
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
//# sourceMappingURL=user.controller.js.map