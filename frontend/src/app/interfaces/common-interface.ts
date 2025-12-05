export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Error;
}

export enum FILE_TYPES {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}