import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
