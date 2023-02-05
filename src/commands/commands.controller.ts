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
import { ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  private readonly logger = new Logger(CommandsController.name);

  @ApiOperation({
    description:
      'This Endpoint implements a parser that translates user inputs into controlling commands that are sent to stations, and responses with charging power in time-series data format.',
  })
  @ApiConsumes('text/plain')
  @ApiBody({
    description: `The commands should be sent in the body of the request in plain text. Each command should be in a new line. The first command should be "Begin" and the last one "End".
    <br><br>
    Valid commands are:
    <br><br>
    Start station <station-id>|all<br>
    Stop station <station-id>|all<br>
    Wait <time-in-second><br>
    `,
    examples: {
      a: {
        summary: 'All commands',
        description: 'Example with all possible commands',
        value: `Begin
Start station 1
Wait 5
Start station 2
Wait 10
Start station all
Wait 10
Stop station 2
Wait 10
Stop station 3
Wait 5
Stop station all
End`,
      }
    },
  })
  @Post()
  async execCommands(@Req() req) {
    try {
      if (req.readable) {
        const raw = await rawbody(req);
        const result = await this.commandsService.processCommands(raw);
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
