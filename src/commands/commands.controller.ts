import {
  Controller,
  Post,
  Logger,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import * as rawbody from 'raw-body';
import { CommandsService } from './commands.service';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  private readonly logger = new Logger(CommandsController.name);

  @Post()
  async execCommands(@Req() req) {
    try {
      if (req.readable) {
        const raw = await rawbody(req);
        const cmds = await this.commandsService.validateBody(raw);
        //process commands
        for (let i = 0; i <= cmds.length - 1; i++) {
          
        }
        return {};
      } else {
        this.logger.log('Plain text raw body not found in request');
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.log(error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
