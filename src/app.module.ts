import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
// import { FirstMiddleware } from './middlewares/first/first.middleware';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
// import { VerifyTokenMiddleware } from './middlewares/verify-token/verify-token.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
    AuthorModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.SECRET || 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule.forRoot(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    MorganMiddleware.configure('dev');
    CorsMiddleware.configure({});

    consumer.apply(CorsMiddleware).forRoutes('');
    // consumer.apply(FirstMiddleware).forRoutes('');
    consumer.apply(MorganMiddleware).forRoutes('');
    consumer.apply(HelmetMiddleware).forRoutes('');
    // consumer.apply(VerifyTokenMiddleware).forRoutes('book*');
  }
}
