import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MailService {
  @Inject() mailerService: MailerService;

  sendForgotPassword(user: User, token: string) {
    try {
      this.mailerService.sendMail({
        to: user.email,
        subject: 'Forgot password',
        template: './forgot-password',
        context: {
          name: user.username,
          token,
        },
      });
    } catch (err) {
      throw new ConflictException('Mail not sent');
    }
  }
}
