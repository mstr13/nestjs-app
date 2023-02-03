import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../stations/entities/station.entity';

@Injectable()
export class CommandsService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async startStation(id: number) {
    return await this.stationRepository.update(id, { isCharging: true });
  }

  async startStationsAll() {
    return await this.stationRepository
      .createQueryBuilder()
      .update(Station)
      .set({ isCharging: true })
      .execute();
  }

  async stopStation(id: number) {
    return await this.stationRepository.update(id, { isCharging: false });
  }

  async stopStationsAll() {
    return await this.stationRepository
      .createQueryBuilder()
      .update(Station)
      .set({ isCharging: false })
      .execute();
  }

  async reportSystemState() {
    return 'Report the current state of the system';
  }
}
