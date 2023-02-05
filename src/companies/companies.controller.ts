import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  InternalServerErrorException
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  private readonly logger = new Logger(CompaniesController.name);

  @ApiOperation({
    description: 'This Endpoint is used to create a new company.',
  })
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      const result = await this.companiesService.create(createCompanyDto);
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }

  @ApiOperation({
    description: 'This Endpoint returns all companies.',
  })
  @Get()
  async findAll() {
    try {
      const result = await this.companiesService.findAll();
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }

  @ApiOperation({
    description:
      'This Endpoint returns all stations that belong to the given company (id) and its child companies.',
  })
  @Get(':id/stations')
  async findStations(@Param('id') id: number) {
    try {
      const result = await this.companiesService.findStations(+id);
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }

  @ApiOperation({
    description:
      'This Endpoint returns the company that corresponds to the specified id.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.companiesService.findOne(+id);
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }

  @ApiOperation({
    description:
      'This Endpoint updates the company. Please only include the fields that you want to update.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      const result = await this.companiesService.update(+id, updateCompanyDto);
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }

  @ApiOperation({
    description:
      'This Endpoint deletes the company that corresponds to the specified id.',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.companiesService.remove(id);
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: error.message,
      });
    }
  }
}
