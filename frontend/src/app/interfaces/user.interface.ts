import { UserStatus } from "./common-interface";

export interface resendOtpInterface {
  user: { name: string; id: string };
}

export interface UserSearchResultResponse {
  id: string;
  name: string;
  email: string;
}

export interface UserLoginResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  token: string;
  message: string;
}

export interface UserChat {
  status: UserStatus;
  lastSeen: null;
  _id: string;
  name: string;
  email: string;
}
