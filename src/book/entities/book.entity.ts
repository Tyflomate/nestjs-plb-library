import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../generics/timestamp';
import { Author } from 'src/author/entities/author.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Book extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  editor: string;
  @Column()
  year: number;
  @Column()
  createdAt: Date;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
