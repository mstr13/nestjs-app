import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationtypesService } from './stationtypes.service';
import { StationtypesController } from './stationtypes.controller';
import { Stationtype } from './entities/stationtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stationtype])],
  controllers: [StationtypesController],
  providers: [StationtypesService],
})
export class StationtypesModule {}
