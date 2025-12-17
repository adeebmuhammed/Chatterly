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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const constants_1 = require("../utils/constants");
const validators_1 = require("../utils/validators");
const otp_helper_1 = __importDefault(require("../utils/otp.helper"));
const base_mapper_1 = require("../mappers/base.mapper");
const user_mapper_1 = require("../mappers/user.mapper");
const jwt_generator_1 = require("../utils/jwt.generator");
let UserService = class UserService {
    constructor(_userRepo, _otpRepo) {
        this._userRepo = _userRepo;
        this._otpRepo = _otpRepo;
        this.login = async (email, password) => {
            if (!(0, validators_1.isValidEmail)(email)) {
                throw new Error("Invalid email format");
            }
            if (!password) {
                throw new Error("password is required");
            }
            const user = await this._userRepo.findByEmail(email);
            if (!user) {
                throw new Error(constants_1.MESSAGES.ERROR.USER_NOT_FOUND);
            }
            if (!user.password) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_CREDENTIALS);
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_CREDENTIALS);
            }
            const accessToken = (0, jwt_generator_1.generateAccessToken)({
                userId: user._id.toString(),
            });
            const loginResponse = user_mapper_1.UserMapper.toUserLoginResponseDto(user, accessToken);
            return {
                loginResponse,
            };
        };
        this.signup = async (userData) => {
            const { name, email, password, confirmPassword, phone } = userData;
            if (!name || !email || !password || !confirmPassword || !phone) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_INPUT_SIGNUP);
            }
            if (!(0, validators_1.isValidEmail)(email)) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_EMAIL);
            }
            if (!(0, validators_1.isValidPhone)(phone)) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_PHONE);
            }
            if (!(0, validators_1.isValidPassword)(password)) {
                throw new Error(constants_1.MESSAGES.ERROR.INVALID_PASSWORD);
            }
            if (password !== confirmPassword) {
                throw new Error(constants_1.MESSAGES.ERROR.PASSWORD_MISMATCH);
            }
            const existingUser = await this._userRepo.findByEmail(email);
            if (existingUser) {
                throw new Error(constants_1.MESSAGES.ERROR.EMAIL_EXISTS);
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const otp = otp_helper_1.default.generateOTP();
            await otp_helper_1.default.sendOTP(email, otp);
            console.log(otp);
            const user = await this._userRepo.create({
                ...userData,
                password: hashedPassword,
            });
            if (!user) {
                throw new Error(constants_1.MESSAGES.ERROR.CREATION_FAILED);
            }
            const otpCreated = await this._otpRepo.create({
                otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                userId: user._id,
            });
            if (!otpCreated) {
                throw new Error("otp generation failed");
            }
            return {
                signupResponse: base_mapper_1.BaseMapper.toMessageResponse(constants_1.MESSAGES.SUCCESS.SIGNUP),
            };
        };
        this.verifyOTP = async (email, otp) => {
            if (!(0, validators_1.isValidOTP)(otp)) {
                throw new Error("OTP must be a 6-digit number");
            }
            const user = await this._userRepo.findByEmail(email);
            if (!user) {
                throw new Error(constants_1.MESSAGES.ERROR.USER_NOT_FOUND);
            }
            const otpGenerated = await this._otpRepo.findOne({ userId: user._id });
            if (!otpGenerated) {
                throw new Error("otp expired");
            }
            if (otpGenerated.otp !== otp) {
                throw new Error(constants_1.MESSAGES.ERROR.OTP_INVALID);
            }
            await this._userRepo.update(user._id.toString(), user);
            return {
                verifyOTPResponse: {
                    message: constants_1.MESSAGES.SUCCESS.OTP_VERIFIED,
                    user: {
                        name: user.name,
                        id: user.id,
                    },
                },
            };
        };
        this.resendOTP = async (email) => {
            const user = await this._userRepo.findByEmail(email);
            if (!user) {
                throw new Error(constants_1.MESSAGES.ERROR.USER_NOT_FOUND);
            }
            const newOTP = otp_helper_1.default.generateOTP();
            await otp_helper_1.default.sendOTP(email, newOTP);
            console.log("Generated OTP:", newOTP);
            const alreadyExistingOtp = await this._otpRepo.findOne({
                userId: user._id,
            });
            let otpCreated;
            if (!alreadyExistingOtp) {
                otpCreated = await this._otpRepo.create({
                    otp: newOTP,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                    userId: user._id,
                });
            }
            else {
                otpCreated = await this._otpRepo.update(alreadyExistingOtp._id.toString(), { otp: newOTP, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
            }
            if (!otpCreated) {
                throw new Error("otp generation failed");
            }
            return {
                resendOTPResponse: {
                    message: constants_1.MESSAGES.SUCCESS.OTP_RESENT,
                    user: {
                        name: user.name,
                        email: user.email,
                    },
                },
            };
        };
        this.searchUsers = async (query) => {
            const users = await this._userRepo.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                ],
            });
            if (!users) {
                throw new Error("No users found");
            }
            return { users: user_mapper_1.UserMapper.toUserSearchResultDtoList(users) };
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IOtpRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map