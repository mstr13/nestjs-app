import { Module } from '@nestjs/common';
import { StationsModule } from '../stations/stations.module';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';

@Module({
  imports: [StationsModule],
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}
