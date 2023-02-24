import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id?: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 124, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @CreateDateColumn()
  CreatedAt?: Date;

  @UpdateDateColumn()
  UpdatedAt?: Date;

  @Column({ type: 'date', nullable: true })
  birthAt?: Date;

  @Column({ default: Role.User })
  role: number;
}
