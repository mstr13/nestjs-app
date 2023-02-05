import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findStations(id: number) {
    return this.companyRepository.query(
      `WITH RECURSIVE childs(id) AS (
        VALUES(?) 
        UNION 
        SELECT company.id FROM company, childs WHERE company.parentId=childs.id
      )
      SELECT s.id, s.name, t.maxPower 
      FROM (station s left join company c on c.id=s.companyId) left join stationtype t on t.id=s.stationTypeId 
      WHERE c.id IN childs`,
      [id],
    );
  }

  findOne(id: number) {
    return this.companyRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id);
  }
}
