import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: String(process.env.TOKEN_SECRET),
    }),
    forwardRef(() => UserModule),
    FileModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
