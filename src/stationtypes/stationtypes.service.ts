import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Stationtype } from './entities/stationtype.entity';
import { CreateStationtypeDto } from './dto/create-stationtype.dto';
import { UpdateStationtypeDto } from './dto/update-stationtype.dto';

@Injectable()
export class StationtypesService {
  constructor(
    @InjectRepository(Stationtype)
    private stationTypeRepository: Repository<Stationtype>,
  ) {}

  create(
    createStationtypeDto: CreateStationtypeDto,
  ): Promise<CreateStationtypeDto> {
    return this.stationTypeRepository.save(createStationtypeDto);
  }

  findAll(): Promise<Stationtype[]> {
    return this.stationTypeRepository.find();
  }

  findOne(id: number): Promise<Stationtype> {
    return this.stationTypeRepository.findOneBy({ id: id });
  }

  update(
    id: number,
    updateStationtypeDto: UpdateStationtypeDto,
  ): Promise<UpdateResult> {
    return this.stationTypeRepository.update(id, updateStationtypeDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.stationTypeRepository.delete(id);
  }
}
