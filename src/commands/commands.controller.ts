import {
  Controller,
  Post,
  Logger,
  Req,
  InternalServerErrorException,
  BadRequestException,
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
        const result = await this.commandsService.processCommands(cmds);
        return result;
      } else {
        this.logger.log('Plain text raw body not found in request');
        throw new BadRequestException('Bad Request', {
          cause: new Error(),
          description: 'Plain text raw body not found in request',
        });
      }
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }
}
