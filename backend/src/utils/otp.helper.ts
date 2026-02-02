import nodemailer from "nodemailer";

class OTPHelper {
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    try {
      console.log("EMAIL:", process.env.NODEMAILER_EMAIL);
      console.log("PASS EXISTS:", !!process.env.NODEMAILER_PASSWORD);

      const transporter = nodemailer.createTransport({
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
    } catch (error) {
      console.error("OTP send failed:", error);
      throw error;
    }
  }
}

export default new OTPHelper();
