import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { StationtypesService } from './stationtypes.service';
import { CreateStationtypeDto } from './dto/create-stationtype.dto';
import { UpdateStationtypeDto } from './dto/update-stationtype.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('stationtypes')
export class StationtypesController {
  constructor(private readonly stationtypesService: StationtypesService) {}

  private readonly logger = new Logger(StationtypesController.name);

  @ApiOperation({
    description: 'This Endpoint is used to create a new station type.',
  })
  @Post()
  async create(@Body() createStationtypeDto: CreateStationtypeDto) {
    try {
      const result = await this.stationtypesService.create(
        createStationtypeDto,
      );
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
    description: 'This Endpoint returns all station types.',
  })
  @Get()
  async findAll() {
    try {
      const result = await this.stationtypesService.findAll();
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
      'This Endpoint returns the station type that corresponds to the specified id.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.stationtypesService.findOne(+id);
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
      'This Endpoint updates the station type. Please only include the fields that you want to update.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStationtypeDto: UpdateStationtypeDto,
  ) {
    try {
      const result = await this.stationtypesService.update(
        +id,
        updateStationtypeDto,
      );
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
      'This Endpoint deletes the station type that corresponds to the specified id.',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.stationtypesService.remove(+id);
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
