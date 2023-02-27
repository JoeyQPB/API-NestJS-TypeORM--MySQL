import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { guardMock } from '../testing/guard.mock';
import { userServiceMock } from '../testing/user.service.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userEntityList } from '../testing/user.entity.list.mock';
import { dataTestCreateUser } from '../testing/user-dto.mock';
import { dataTestUpdatePutUserDTO } from '../testing/update-user-dto.mock';
import { dataTestUpdatePatchUserDTO } from '../testing/updatepartial-user-dto.mock';

describe('userController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('validar definição', () => {
    expect(UserController).toBeDefined();
    expect(userService).toBeDefined();
  });

  test('test da aplicação dos Guards nesse controller', () => {
    test('guards aplicados corretamente', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('create', () => {
    test('create method', async () => {
      const result = await userController.create(dataTestCreateUser);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('read', () => {
    test('read all method', async () => {
      const result = await userController.readAlllUsers();
      expect(result).toEqual(userEntityList);
    });
    test('read one user method', async () => {
      const result = await userController.readOneUser(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('update', () => {
    test('update method', async () => {
      const result = await userController.update(1, dataTestUpdatePutUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });

    test('update partial method', async () => {
      const result = await userController.updatePartial(
        1,
        dataTestUpdatePatchUserDTO,
      );
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.deleteUser(1);
      expect(result).toEqual(true);
    });
  });
});
