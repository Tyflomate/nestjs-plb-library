import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dtos/book.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { CanEditGuard } from 'src/can-edit/can-edit.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('book')
@UseGuards(JwtAuthGuard)
@ApiTags('books')
export class BookController {
  @Inject() service: BookService;

  @Get()
  getAllBooks(@Res() response: Response) {
    this.service
      .getAllBooks()
      .then((result) => {
        return response.json(result);
      })
      .catch((error) => {
        throw new ConflictException(error);
      });
  }

  @Get('count')
  async nbBooksByYearBetween(
    @Res() response: Response,
    @Query('startYear') startYear: number,
    @Query('endYear') endYear: number,
  ) {
    const count = await this.service.nbBooksByYearBetween(startYear, endYear);
    return response.json({ count });
  }

  @Get(':id')
  async getBookById(@Res() response: Response, @Param('id') id: number) {
    const book = await this.service.getBookById(id);

    if (!book) throw new NotFoundException("Le livre n'existe pas");

    return response.json(book);
  }

  @Post()
  async addBook(
    @Req() request: Request,
    @Body() body: BookDTO,
    @Res() response: Response,
  ) {
    try {
      const newBook = await this.service.addBook(body, request.user['id']);
      return response.json({ message: 'Livre ajouté', newBook });
    } catch {
      throw new ConflictException();
    }
  }

  @Put(':id')
  @UseGuards(/*AdminGuard,*/ CanEditGuard)
  async updateBook(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() body: BookDTO,
  ) {
    return response.json(await this.service.updateBook(id, body));
  }

  @Delete(':id/soft')
  @UseGuards(AdminGuard)
  async softDeleteBook(@Res() response: Response, @Param('id') id: number) {
    const deletedBooks = await this.service.softDeleteBook(id);
    console.log(deletedBooks);
    if (!deletedBooks.affected)
      throw new NotFoundException("Le livre n'existe pas");
    return response.json({ message: 'Livre supprimé', id });
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteBook(@Res() response: Response, @Param('id') id: number) {
    const deletedBooks = await this.service.deleteBook(id);
    if (!deletedBooks.affected)
      throw new NotFoundException("Le livre n'existe pas");
    return response.json({ message: 'Livre supprimé', id });
  }

  @Put(':id/restore')
  @UseGuards(AdminGuard)
  async restoreBook(@Res() response: Response, @Param('id') id: number) {
    const restoredBooks = await this.service.restoreBook(id);
    if (!restoredBooks.affected)
      throw new NotFoundException("Le livre n'existe pas");
    return response.json({ message: 'Livre restauré', id });
  }
}
