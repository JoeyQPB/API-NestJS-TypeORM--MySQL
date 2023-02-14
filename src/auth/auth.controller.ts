import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegistrerDTO } from './dto/auth.registrer.dto';
import { AuthResetPassword } from './dto/AuthResetPassword.dto';
import { ForgetPasswordDTO } from './dto/ForgetPassword.dto';

@Controller('auth')
export class AuthController {
  //      injetando o serviço
  constructor(
    private readonly userService: UserService,
    private readonly AuthService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return this.AuthService.resetPassword(data.password, data.email);
  }

  @Post('registrer')
  async registrer(@Body() data: AuthRegistrerDTO) {
    return this.userService.create(data);
  }

  @Post('forget_password')
  async forgetPassword(@Body() { email }: ForgetPasswordDTO) {
    return this.AuthService.forgetPassword(email);
  }

  @Post('reset_password')
  async resetPassword(@Body() { password, token }: AuthResetPassword) {
    return this.AuthService.resetPassword(password, token);
  }
}
