import { JwtService } from '@nestjs/jwt';
import { accesToken } from '../testing/access-token.mock';
import { jwtPayload } from './jwt-payload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(accesToken),
    verify: jest.fn().mockReturnValue(jwtPayload),
  },
};
