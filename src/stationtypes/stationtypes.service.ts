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

  create(createStationtypeDto: CreateStationtypeDto) {
    return 'This action adds a new stationtype';
  }

  findAll() {
    return `This action returns all stationtypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stationtype`;
  }

  update(id: number, updateStationtypeDto: UpdateStationtypeDto) {
    return `This action updates a #${id} stationtype`;
  }

  remove(id: number) {
    return `This action removes a #${id} stationtype`;
  }
}
