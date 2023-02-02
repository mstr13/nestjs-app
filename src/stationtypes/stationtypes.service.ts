import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stationtype } from './entities/stationtype.entity';
import { CreateStationtypeDto } from './dto/create-stationtype.dto';
import { UpdateStationtypeDto } from './dto/update-stationtype.dto';

@Injectable()
export class StationtypesService {
  constructor(
    @InjectRepository(Stationtype)
    private stationTypeRepository: Repository<Stationtype>,
  ) {}

  async create(createStationtypeDto: CreateStationtypeDto) {
    return await this.stationTypeRepository.save(createStationtypeDto);
  }

  async findAll() {
    return await this.stationTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.stationTypeRepository.findOneBy({ id: id });
  }

  async update(id: number, updateStationtypeDto: UpdateStationtypeDto) {
    return await this.stationTypeRepository.update(id, updateStationtypeDto);
  }

  async remove(id: number) {
    return await this.stationTypeRepository.delete(id);
  }
}
