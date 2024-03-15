import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookService } from 'src/book/book.service';

@Injectable()
export class CanEditGuard implements CanActivate {
  @Inject() private readonly bookService: BookService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(this.bookService.getBookById(req.params['id']));
    console.log(req.user['id']);
    return (
      req.user['id'] == this.bookService.getBookById(req.params['id']).user
    );
  }
}
