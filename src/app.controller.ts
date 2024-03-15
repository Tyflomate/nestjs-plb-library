import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller('plb')
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get('intro')
  getHello(): string {
    return '<h1> Hello world! </h1>';
  }
}
