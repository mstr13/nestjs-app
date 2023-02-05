import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //returns welcome message
  getHello(): string {
    return 'Welcom to the NestJS App demo!';
  }
}
