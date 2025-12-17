export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: {
    SIGNUP: "Signup successful. Please verify your email.",
    LOGIN: "Login successful",
    LOGOUT: "Logout successful",
    OTP_SENT: "OTP sent to your email",
    OTP_VERIFIED: "OTP verified successfully",
    OTP_RESENT: "OTP resent successfully",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Invalid credentials",
    EMAIL_EXISTS: "Email already exists",
    USER_NOT_FOUND: "User not found",
    INVALID_INPUT_SIGNUP: "Invalid input: Name, Phone, Email, Password and Confirm Password are required",
    INVALID_INPUT: "Invalid input: Email and Password are required",
    PASSWORD_MISMATCH: "Password and Confirm Password do not match",
    JWT_SECRET_MISSING: "JWT secret is not configured",
    OTP_INVALID: "Invalid OTP",
    OTP_EXPIRED: "OTP has expired",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden access",
    SERVER_ERROR: "Internal server error",
    MISSING_FIELDS: "Required fields are missing",
    INVALID_TOKEN: "Invalid or expired token",
    INVALID_EMAIL: "Invalid Email Format",
    INVALID_PASSWORD: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    INVALID_PHONE: "Invalid Phone No Format",
    CREATION_FAILED: "document creation failed",
  },
};

export const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  OTP: /^\d{6}$/,
  PHONE: /^[0-9]{10,15}$/,
};

export enum USER_ACTIVE_STATUS {
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum FILE_TYPES {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}