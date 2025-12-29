export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Error;
}

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline'
}

export interface GeneratedSignedUrl {
  uploadUrl: string;
  fileUrl: string;
}
