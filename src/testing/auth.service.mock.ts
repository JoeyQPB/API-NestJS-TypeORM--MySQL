import { AuthService } from '../auth/auth.service';
import { accesToken } from './access-token.mock';
import { jwtPayload } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue(accesToken),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue(accesToken),
    forgetPassword: jest.fn().mockReturnValue(true),
    resetPassword: jest.fn().mockResolvedValue(accesToken),
    register: jest.fn().mockResolvedValue(accesToken),
  },
};
