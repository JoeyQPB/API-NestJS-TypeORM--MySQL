import { UserService } from '../user/user.service';
import { userEntityList } from './user.entity.list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(userEntityList),
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
  },
};
