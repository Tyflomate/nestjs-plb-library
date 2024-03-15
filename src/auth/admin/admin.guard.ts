import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from '../generics/roleEnum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return context.switchToHttp().getRequest().user['role'] == RoleEnum.ADMIN;
  }
}
