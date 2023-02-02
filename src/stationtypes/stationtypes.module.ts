import { Module } from '@nestjs/common';
import { StationtypesService } from './stationtypes.service';
import { StationtypesController } from './stationtypes.controller';

@Module({
  controllers: [StationtypesController],
  providers: [StationtypesService]
})
export class StationtypesModule {}
