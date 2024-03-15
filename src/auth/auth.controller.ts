import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject() private authService: AuthService;

  @Post('register')
  async register(@Body() credentials, @Res() res) {
    try {
      const result = await this.authService.register(credentials);
      return res.json({ message: 'Utilisateur inscrit', user: result });
    } catch (err) {
      throw new ConflictException('Username ou email existant');
    }
  }

  @Post('login')
  async login(@Body() credentials, @Res() res) {
    return res.json({
      message: 'Utilisateur connecté',
      ...(await this.authService.login(credentials)),
    });
  }

  @Post('forgot-password')
  async forgotPassword(@Body('login') login, @Res() res) {
    try {
      const token = await this.authService.forgotPassword(login);
      return res.json({ message: 'Login envoyé', token });
    } catch (err) {
      throw new ConflictException('Login inconnu');
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('password') password: string,
    @Res() res,
  ) {
    try {
      await this.authService.resetPassword(token, password);
      return res.json({ message: 'Mot de passe mis à jour' });
    } catch {
      throw new ConflictException('Token invalide');
    }
  }
}
