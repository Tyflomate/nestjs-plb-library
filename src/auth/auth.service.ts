import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  @InjectRepository(User) private userRepository: Repository<User>;
  @Inject() private jwtService: JwtService;
  @Inject() private mailService: MailService;

  async register(credentials) {
    const user = this.userRepository.create({
      username: credentials.username,
      email: credentials.email,
      salt: await bcrypt.genSalt(),
    });

    user.password = await bcrypt.hash(credentials.password, user.salt);

    return this.userRepository.save(user);
  }

  async login(credentials) {
    const user = await this.userRepository.findOne({
      where: [
        { username: credentials.username },
        { email: credentials.username },
      ],
    });

    if (!user) throw new NotFoundException('Wrong email or username');
    if (!(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
      user,
    };
  }

  async forgotPassword(login) {
    const user = await this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
    });
    if (!user) throw new NotFoundException('User not found');

    const token = this.jwtService.sign({ login });

    this.mailService.sendForgotPassword(user, token);
    return token;
  }

  async resetPassword(token: string, newPassword: string) {
    console.log(token);
    const decodedToken = this.jwtService.verify(token);
    if (!decodedToken) throw new UnauthorizedException('token is invalid');
    let user = await this.userRepository.findOne({
      where: {
        email: decodedToken.login,
      },
    });
    const hashedPassword = await bcrypt.hash(newPassword, user['salt']);
    user = await this.userRepository.preload({
      ...user,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
