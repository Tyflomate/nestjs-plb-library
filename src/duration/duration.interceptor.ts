import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Temps de traitement: ${Date.now() - dateIn}ms`)),
      );
  }
}
