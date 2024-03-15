import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  @InjectRepository(User) private userRepository: Repository<User>;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const user = await this.userRepository.findOneBy({
      id: payload.id,
    });
    return user;
  }
}
