import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegistrerDTO } from './dto/auth.registrer.dto';
import { AuthResetPasswordDTO } from './dto/AuthResetPassword.dto';
import { ForgetPasswordDTO } from './dto/ForgetPassword.dto';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { CreateUserDTO } from '../user/dto/create-user-dto';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  //      injetando o serviço
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data: AuthRegistrerDTO) {
    return this.authService.register(data);
  }

  @Post('forget_password')
  async forgetPassword(@Body() { email }: ForgetPasswordDTO) {
    return this.authService.forgetPassword(email);
  }

  @Post('reset_password')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
    return this.authService.resetPassword(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async checkToken(@User() user: UserEntity) {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 100 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const filename = `photo-${user.id}.png`;

    try {
      await this.fileService.uploadFile(photo, filename);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
    return photo;
  }

  // multiplos arquivos
  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(
    @User() user,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return files;
  }

  // multp arquivos e cada um em um field separado
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ]),
  )
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFilesFields(
    @User() user,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] },
  ) {
    return files;
  }
}
