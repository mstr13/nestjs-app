import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { Station } from './entities/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  exports: [TypeOrmModule],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
