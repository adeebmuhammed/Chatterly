export class UserRegisterRequestDto {
  name!: string;
  email!: string;
  phone?: string;
  password!: string;
  confirmPassword!: string;
}