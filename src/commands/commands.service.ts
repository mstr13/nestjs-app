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

  async validateBody(raw: Buffer) {
    const text = raw.toString().trim();
    const cmds = text.split(/[\r\n]+/).map(function (item) {
      return item.trim();
    });
    //check if we have at least 2 commands
    if (cmds.length < 2) {
      throw new Error('Commands not well formated!');
    }
    //check if the first and last command
    if (cmds[0] != 'Begin' || cmds[cmds.length - 1] != 'End') {
      throw new Error('Commands not well formated!');
    }
    for (let i = 1; i < cmds.length - 1; i++) {
      //check if we have only allowed and well formated commands
      const pattern = /(Start station (\d|all)|Stop station (\d|all)|Wait \d)/;
      const cmd = cmds[i];
      if (!pattern.test(cmd)){
        throw new Error('Commands not well formated!');
      }
    }
    return cmds;
  }

  async reportSystemState() {
    return 'Report the current state of the system';
  }
}
