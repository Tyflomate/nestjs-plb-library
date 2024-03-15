import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './dtos/book.dto';
import { GenericsService } from 'src/generics/generics.service';

@Injectable()
export class BookService {
  @InjectRepository(Book) private readonly bookRepository: Repository<Book>;
  @Inject() private readonly genericService: GenericsService;

  getAllBooks() {
    return this.genericService.getAll(this.bookRepository);
  }

  getBookById(id: number) {
    return this.genericService.getById(this.bookRepository, id);
  }

  addBook(book: BookDTO, userId: number) {
    return this.genericService.add(this.bookRepository, {
      ...book,
      user: userId,
    });
  }

  async updateBook(id: number, book: BookDTO) {
    return this.genericService.update(this.bookRepository, id, book);
  }

  deleteBook(id: number) {
    return this.genericService.delete(this.bookRepository, id);
  }

  softDeleteBook(id: number) {
    return this.genericService.softDelete(this.bookRepository, id);
  }

  restoreBook(id: number) {
    return this.genericService.restore(this.bookRepository, id);
  }

  nbBooksByYearBetween(startYear: number, endYear: number) {
    console.log(startYear, endYear);
    return this.bookRepository
      .createQueryBuilder('book')
      .select('year, count(*) as nb')
      .where('year BETWEEN :startYear AND :endYear', {
        startYear,
        endYear,
      })
      .groupBy('year')
      .getRawMany();
  }
}
