import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html') //overwrite the default inference behavior of nest js (optionally)
  getHello(): { hello: string } {
    return this.appService.getHello();
  }
}
