import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMeDTO } from './dto/auth-me.dto';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegistrerDTO } from './dto/auth.registrer.dto';
import { AuthResetPasswordDTO } from './dto/AuthResetPassword.dto';
import { ForgetPasswordDTO } from './dto/ForgetPassword.dto';

@Controller('auth')
export class AuthController {
  //      injetando o serviço
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return this.AuthService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data: AuthRegistrerDTO) {
    return this.AuthService.register(data);
  }

  @Post('forget_password')
  async forgetPassword(@Body() { email }: ForgetPasswordDTO) {
    return this.AuthService.forgetPassword(email);
  }

  @Post('reset_password')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
    return this.AuthService.resetPassword(password, token);
  }

  @Post('me')
  async checkToken(@Body() body: AuthMeDTO) {
    return this.AuthService.checkToken(body.token);
  }
}