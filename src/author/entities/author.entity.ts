import { Book } from 'src/book/entities/book.entity';
import { Timestamp } from 'src/generics/timestamp';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
