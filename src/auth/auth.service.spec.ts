import { Test, TestingModule } from '@nestjs/testing';
import { accesToken } from '../testing/access-token.mock';
import { authRegisterDTO } from '../testing/auth-register.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { maillerServiceMock } from '../testing/mailer-service.mock';
import { resetToken } from '../testing/reset-token.mock';
import { userEntityList } from '../testing/user.entity.list.mock';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { userServiceMock } from '../testing/user.service.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        maillerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('Create Token Method', () => {
      const result = authService.createToken(userEntityList[1]);
      expect(result).toEqual({ accesToken });
    });

    test('check Token Method', () => {
      const result = authService.checkToken(accesToken);
      expect(result).toEqual(jwtPayload);
    });

    test('is valid Token Method', () => {
      const result = authService.isValidToken(accesToken);
      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {
    test('Login Method', async () => {
      const result = await authService.login('jhondoe@email.com', '123456');
      expect(result).toEqual({ accesToken });
    });

    test('Forget Password Method', async () => {
      const result = await authService.forgetPassword('jhondoe@email.com');
      expect(result).toEqual(true);
    });

    test('Reset Password Method', async () => {
      const result = await authService.resetPassword('6554321', resetToken);
      expect(result).toEqual(true);
    });

    test('Register method', async () => {
      const result = await authService.register(authRegisterDTO);
      expect(result).toEqual(true);
    });
  });
});
