export declare const STATUS_CODES: {
    OK: number;
    CREATED: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    CONFLICT: number;
    INTERNAL_SERVER_ERROR: number;
};
export declare const MESSAGES: {
    SUCCESS: {
        SIGNUP: string;
        LOGIN: string;
        LOGOUT: string;
        OTP_SENT: string;
        OTP_VERIFIED: string;
        OTP_RESENT: string;
    };
    ERROR: {
        INVALID_CREDENTIALS: string;
        EMAIL_EXISTS: string;
        USER_NOT_FOUND: string;
        INVALID_INPUT_SIGNUP: string;
        INVALID_INPUT: string;
        PASSWORD_MISMATCH: string;
        JWT_SECRET_MISSING: string;
        OTP_INVALID: string;
        OTP_EXPIRED: string;
        UNAUTHORIZED: string;
        FORBIDDEN: string;
        SERVER_ERROR: string;
        MISSING_FIELDS: string;
        INVALID_TOKEN: string;
        INVALID_EMAIL: string;
        INVALID_PASSWORD: string;
        INVALID_PHONE: string;
        CREATION_FAILED: string;
    };
};
export declare const REGEX: {
    EMAIL: RegExp;
    PASSWORD: RegExp;
    OTP: RegExp;
    PHONE: RegExp;
};
export declare enum USER_ACTIVE_STATUS {
    ONLINE = "online",
    OFFLINE = "offline"
}
export declare enum FILE_TYPES {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file"
}
export declare enum NOTIFICATION_TYPE {
    MESSAGE = "MESSAGE",
    GROUP = "GROUP",
    SYSTEM = "SYSTEM"
}
//# sourceMappingURL=constants.d.ts.map