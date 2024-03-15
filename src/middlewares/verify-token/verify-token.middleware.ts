import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  @Inject() jwtService: JwtService;
  @Inject() configService: ConfigService;

  use(req: any, res: any, next: () => void) {
    console.log(req.headers);
    const header = req.get('Authorization');
    if (!header) throw new UnauthorizedException('Missing access token');

    const accessToken = header.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(accessToken, {
        secret: this.configService.get('SECRET'),
      });
      if (!decodedToken)
        throw new UnauthorizedException('Access token expired');
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }

    next();
  }
}
