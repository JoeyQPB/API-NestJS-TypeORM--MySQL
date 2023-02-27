import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { accesToken } from '../testing/access-token.mock';
import { authForgetDTO } from '../testing/auth-forget-dto.mock';
import { authLoginDTO } from '../testing/auth-login-dto.mocl';
import { authRegisterDTO } from '../testing/auth-register.mock';
import { authResetPassworDTO } from '../testing/auth.reset-dto.mock';
import { authServiceMock } from '../testing/auth.service.mock';
import { fileServiceMock } from '../testing/file.service.mock';
import { getPhoto } from '../testing/get-photo.mock';
import { guardMock } from '../testing/guard.mock';
import { userEntityList } from '../testing/user.entity.list.mock';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('validar definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual(accesToken);
    });
    test('register method', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual(accesToken);
    });
    test('forget password method', async () => {
      const result = await authController.forgetPassword(authForgetDTO);
      expect(result).toEqual(true);
    });
    test('reset password method', async () => {
      const result = await authController.resetPassword(authResetPassworDTO);
      expect(result).toEqual(accesToken);
    });
  });

  describe('rotas autenticadas', () => {
    test('me method', async () => {
      const result = await authController.checkToken(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    test('upload photo method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
