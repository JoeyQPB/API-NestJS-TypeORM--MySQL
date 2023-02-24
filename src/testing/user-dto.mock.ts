import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user-dto';

export const dataTestCreateUser: CreateUserDTO = {
  birthAt: '1918-12-12',
  email: 'jhonDoe@email.com',
  name: 'Jhon Doe',
  password: '123456',
  role: Role.User,
};
