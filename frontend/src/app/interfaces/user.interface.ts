export interface resendOtpInterface {
  user: { name: string; id: string };
}

export interface UserSearchResultResponse {
  id: string;
  name: string;
  email: string;
}
