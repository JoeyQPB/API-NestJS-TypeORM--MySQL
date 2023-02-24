import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user-dto';

export const dataTestUpdatePutUserDTO: UpdatePutUserDTO = {
  birthAt: '1918-01-10',
  email: 'jhonDoe@email.com',
  name: 'Jhon Doe',
  password: '123456',
  role: Role.User,
};
