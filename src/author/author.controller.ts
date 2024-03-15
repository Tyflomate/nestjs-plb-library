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
  Res,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDTO } from './dtos/author.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('author')
@ApiTags('authors')
export class AuthorController {
  @Inject() service: AuthorService;

  @Get()
  getAllAuthors(@Res() response: Response) {
    this.service
      .getAllAuthors()
      .then((result) => {
        return response.json(result);
      })
      .catch((error) => {
        throw new ConflictException(error);
      });
  }

  @Get(':id')
  async getAuthorById(@Res() response: Response, @Param('id') id: number) {
    const book = await this.service.getAuthorById(id);

    if (!book) throw new NotFoundException("L'auteur n'existe pas");

    return response.json(book);
  }

  @Post()
  async addAuthor(@Body() body: AuthorDTO, @Res() response: Response) {
    try {
      const newAuthor = await this.service.addAuthor(body);
      return response.json({ message: 'Auteur ajouté', newAuthor });
    } catch {
      throw new ConflictException();
    }
  }

  @Put(':id')
  async updateAuthor(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() body: AuthorDTO,
  ) {
    return response.json(await this.service.updateAuthor(id, body));
  }

  @Delete(':id/soft')
  async softDeleteAuthor(@Res() response: Response, @Param('id') id: number) {
    const deletedAuthors = await this.service.softDeleteAuthor(id);
    console.log(deletedAuthors);
    if (!deletedAuthors.affected)
      throw new NotFoundException("L'auteur n'existe pas");
    return response.json({ message: 'Auteur supprimé', id });
  }

  @Delete(':id')
  async deleteAuthor(@Res() response: Response, @Param('id') id: number) {
    const deletedAuthors = await this.service.deleteAuthor(id);
    if (!deletedAuthors.affected)
      throw new NotFoundException("L'auteur n'existe pas");
    return response.json({ message: 'Auteur supprimé', id });
  }

  @Put(':id/restore')
  async restoreAuthor(@Res() response: Response, @Param('id') id: number) {
    const restoredAuthors = await this.service.restoreAuthor(id);
    if (!restoredAuthors.affected)
      throw new NotFoundException("L'auteur n'existe pas");
    return response.json({ message: 'Auteur restauré', id });
  }
}
