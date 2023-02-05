import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'This Endpoint just responds with a welcome message.',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
