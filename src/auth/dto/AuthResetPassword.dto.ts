import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetPassword {
  @IsString()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}
