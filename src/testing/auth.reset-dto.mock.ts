import { AuthResetPasswordDTO } from '../auth/dto/AuthResetPassword.dto';
import { resetToken } from './reset-token.mock';

export const authResetPassworDTO: AuthResetPasswordDTO = {
  password: '1234567',
  token: resetToken,
};
