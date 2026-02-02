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
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER, // a14fcf001@smtp-brevo.com
                    pass: process.env.SMTP_PASS, // SMTP key
                },
            });
            await transporter.sendMail({
                from: "Chatterly <muhammedadeeb445@gmail.com>", // ✅ important
                to: email,
                subject: "Your OTP",
                text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
            });
            console.log("OTP sent successfully via Brevo");
        }
        catch (error) {
            console.error("OTP send failed:", error);
            throw error;
        }
    }
}
exports.default = new OTPHelper();
//# sourceMappingURL=otp.helper.js.map