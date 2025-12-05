export class UserRegisterRequestDto {
  name!: string;
  email!: string;
  phone?: string;
  password!: string;
  confirmPassword!: string;
}

export class UserLoginResponseDto {
  id!: string;
  name!: string;
  email!: string;
  phone?: string;
  status!: string;
  token!: string;
  message!: string;
}

export class UserSearchResultDto {
  id!: string;
  name!: string;
  email!: string;
}