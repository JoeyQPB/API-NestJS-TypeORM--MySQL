import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

// const now = date.now();

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    birthAt: new Date('1918-01-10'),
    email: 'jhonDoe@email.com',
    name: 'Jhon Doe',
    password: '123456',
    role: Role.User,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  },
  {
    id: 2,
    birthAt: new Date('1918-01-10'),
    email: 'jhonDoe@email.com',
    name: 'Jhon Doe',
    password: '123456',
    role: Role.User,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  },
  {
    id: 3,
    birthAt: new Date('1918-01-10'),
    email: 'jhonDoe@email.com',
    name: 'Jhon Doe',
    password: '123456',
    role: Role.User,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  },
];
