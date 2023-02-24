import { Test, TestingModule } from '@nestjs/testing';
import { userEntityList } from '../testing/user.entity.list.mock';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { UserService } from './user.service';

import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataTestCreateUser } from '../testing/user-dto.mock';
import { dataTestUpdatePatchUserDTO } from '../testing/updatepartial-user-dto.mock';
import { dataTestUpdatePutUserDTO } from '../testing/update-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const data = dataTestCreateUser;
      const result = await userService.create(data);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('method getAllUsers', async () => {
      const result = await userService.getAllUsers();

      expect(result).toEqual(userEntityList);
    });

    test('method getOneUser', async () => {
      const result = await userService.getOneUser(1);

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(1, dataTestUpdatePutUserDTO);

      expect(result).toEqual(userEntityList[1]);
    });

    test('method updatePartial', async () => {
      const result = await userService.updatePartial(
        1,
        dataTestUpdatePatchUserDTO,
      );

      expect(result).toEqual(userEntityList[1]);
    });
  });

  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
