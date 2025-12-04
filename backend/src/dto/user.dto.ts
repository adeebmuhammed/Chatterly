export class UserRegisterRequestDto {
  name!: string;
  email!: string;
  phone?: string;
  password!: string;
  confirmPassword!: string;
}

export class UserSearchResultDto {
  id!: string;
  name!: string;
  email!: string;
}