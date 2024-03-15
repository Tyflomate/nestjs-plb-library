import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../generics/roleEnum';
import { Timestamp } from 'src/generics/timestamp';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
