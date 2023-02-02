import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { StationsModule } from './stations/stations.module';
import { StationtypesModule } from './stationtypes/stationtypes.module';

@Module({
  imports: [CompaniesModule, StationsModule, StationtypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
