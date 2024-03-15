import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { GenericsService } from 'src/generics/generics.service';
import { AuthorDTO } from './dtos/author.dto';

@Injectable()
export class AuthorService {
  @InjectRepository(Author)
  private readonly authorRepository: Repository<Author>;
  @Inject() private readonly genericService: GenericsService;

  getAllAuthors() {
    return this.genericService.getAll(this.authorRepository);
  }

  getAuthorById(id: number) {
    return this.genericService.getById(this.authorRepository, id);
  }

  addAuthor(author: AuthorDTO) {
    return this.genericService.add(this.authorRepository, author);
  }

  updateAuthor(id: number, author: AuthorDTO) {
    return this.genericService.update(this.authorRepository, id, author);
  }

  deleteAuthor(id: number) {
    return this.genericService.delete(this.authorRepository, id);
  }

  softDeleteAuthor(id: number) {
    return this.genericService.softDelete(this.authorRepository, id);
  }

  restoreAuthor(id: number) {
    return this.genericService.restore(this.authorRepository, id);
  }
}
