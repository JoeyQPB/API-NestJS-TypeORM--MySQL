import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @CreateDateColumn()
  CreatedAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;

  @Column({ type: 'date', nullable: true })
  birthAt: Date;

  @Column({ enum: [1, 2] })
  role: number;
}
