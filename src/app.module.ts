import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { StationsModule } from './stations/stations.module';
import { StationtypesModule } from './stationtypes/stationtypes.module';
import { Company } from './companies/entities/company.entity';
import { Station } from './stations/entities/station.entity';
import { Stationtype } from './stationtypes/entities/stationtype.entity';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [Company, Station, Stationtype],
  synchronize: true,
};

@Module({
  imports: [
    CompaniesModule,
    StationsModule,
    StationtypesModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
