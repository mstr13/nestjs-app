import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../stations/entities/station.entity';
import { TreeDataDto } from './dto/tree-data.dto';
import { StepDto } from './dto/step.dto';
import { CompanyReportDto } from './dto/company-report.dto';

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

  async chargingReport(): Promise<TreeDataDto[]> {
    return await this.stationRepository.query(
      `WITH RECURSIVE descendants(id, parentId, descendantId) AS (
        SELECT id, parentId, id as descendantId FROM company
        UNION ALL
        SELECT c.id, c.parentId, d.descendantId FROM company c, descendants d WHERE c.id=d.parentId
      )
      SELECT d.id as companyId, s.id as stationId, t.maxPower 
      FROM (station s LEFT JOIN descendants d ON s.companyId = d.descendantId) LEFT JOIN stationtype t ON t.id=s.stationTypeId 
      WHERE s.isCharging = TRUE 
      ORDER BY d.id`,
    );
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
      const pattern =
        /(Start station ([1-9][0-9]*|all)|Stop station ([1-9][0-9]*|all)|Wait [1-9][0-9]*)/;
      const cmd = cmds[i];
      if (!pattern.test(cmd)) {
        throw new Error('Commands not well formated!');
      }
    }
    return cmds;
  }

  async step(data: TreeDataDto[]): Promise<StepDto> {
    const step = {} as StepDto;
    step.step = '';
    step.timestamp = Date.now();
    step.companies = [];
    step.totalChargingStations = [];
    step.totalChargingPower = 0;
    let company = {} as CompanyReportDto;
    company.id = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].companyId != company.id) {
        if (company.id > 0) {
          step.companies.push(company);
        }
        company = {} as CompanyReportDto;
        company.id = data[i].companyId;
        company.chargingStations = [];
        company.chargingPower = 0;
      }
      company.chargingStations.push(data[i].stationId);
      company.chargingPower += data[i].maxPower;
      if (!step.totalChargingStations.includes(data[i].stationId)){
        step.totalChargingStations.push(data[i].stationId);
        step.totalChargingPower += data[1].maxPower;
      }
    }
    if (company.id > 0) {
      step.companies.push(company);
    }
    return step;
  }

  async processCommands(cmds: string[]) {
    const begin = /Begin/;
    const end = /End/;
    const start = /Start station ([1-9][0-9]*|all)/;
    const stop = /Stop station ([1-9][0-9]*|all)/;
    const wait = /Wait [1-9][0-9]*/;
    const report = { data: [] };
    for (let i = 0; i <= cmds.length - 1; i++) {
      if (begin.test(cmds[i])) {
        const result = await this.chargingReport();
        const step = await this.step(result);
        step.step = cmds[i];
        report.data.push(step);
      } else if (end.test(cmds[i])) {
        const result = await this.chargingReport();
        const step = await this.step(result);
        step.step = cmds[i];
        report.data.push(step);
      } else if (start.test(cmds[i])) {
        const match = cmds[i].match(/Start station ([1-9][0-9]*|all)/);
        const arg = match[1];
        if (arg == 'all') {
          await this.startStationsAll();
        } else {
          await this.startStation(Number(arg));
        }
        const result = await this.chargingReport();
        const step = await this.step(result);
        step.step = cmds[i];
        report.data.push(step);
      } else if (stop.test(cmds[i])) {
        const match = cmds[i].match(/Stop station ([1-9][0-9]*|all)/);
        const arg = match[1];
        if (arg == 'all') {
          await this.stopStationsAll();
        } else {
          await this.stopStation(Number(arg));
        }
        const result = await this.chargingReport();
        const step = await this.step(result);
        step.step = cmds[i];
        report.data.push(step);
      } else if (wait.test(cmds[i])) {
        const match = cmds[i].match(/Wait ([1-9][0-9]*)/);
        const arg = match[1];
        await new Promise((resolve) => setTimeout(resolve, Number(arg) * 1000));
      }
    }
    return report;
  }
}
