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
  status: string;
  token: string;
  message: string;
}
