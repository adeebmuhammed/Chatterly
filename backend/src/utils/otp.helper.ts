import nodemailer from "nodemailer";

class OTPHelper {
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(email: string, otp: string): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
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
  } catch (error) {
    console.error("OTP send failed:", error);
    throw error;
  }
}

}

export default new OTPHelper();
