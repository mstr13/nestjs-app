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

  create(createStationDto: CreateStationDto) {
    return this.stationRepository.save(createStationDto);
  }

  findAll() {
    return this.stationRepository.find();
  }

  findOne(id: number) {
    return this.stationRepository.findOneBy({ id: id });
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return this.stationRepository.update(id, updateStationDto);
  }

  remove(id: number) {
    return this.stationRepository.delete(id);
  }
}
