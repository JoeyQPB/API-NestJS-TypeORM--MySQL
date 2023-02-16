import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDTO } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegistrerDTO } from './dto/auth.registrer.dto';
import { AuthResetPasswordDTO } from './dto/AuthResetPassword.dto';
import { ForgetPasswordDTO } from './dto/ForgetPassword.dto';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {
  //      injetando o serviço
  constructor(
    private readonly AuthService: AuthService,
    private readonly fileService: FileService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Post('me')
  async checkToken(@User() user: CreateUserDTO) {
    return { user };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user,
    @UploadedFile('file') photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '../',
      '../',
      'storage',
      'photos',
      `photo-${user.id}.png`,
    );

    try {
      await this.fileService.uploadFile(photo, path);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
    return { sucess: true };
  }
}
