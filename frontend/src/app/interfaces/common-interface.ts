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