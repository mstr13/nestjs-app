import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async create(createStationDto: CreateStationDto) {
    return await this.stationRepository.save(createStationDto);
  }

  async findAll() {
    return await this.stationRepository.find();
  }

  async findOne(id: number) {
    return await this.stationRepository.findOneBy({ id: id });
  }

  async update(id: number, updateStationDto: UpdateStationDto) {
    return await this.stationRepository.update(id, updateStationDto);
  }

  async remove(id: number) {
    return await this.stationRepository.delete(id);
  }
}
