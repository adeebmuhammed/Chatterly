"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class OTPHelper {
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOTP(email, otp) {
        try {
            console.log("EMAIL:", process.env.NODEMAILER_EMAIL);
            console.log("PASS EXISTS:", !!process.env.NODEMAILER_PASSWORD);
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: email,
                subject: "Your OTP",
                text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
            });
            console.log("OTP sent:", info.messageId);
        }
        catch (error) {
            console.error("OTP send failed:", error);
            throw error;
        }
    }
}
exports.default = new OTPHelper();
//# sourceMappingURL=otp.helper.js.map