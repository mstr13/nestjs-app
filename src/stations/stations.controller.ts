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
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  private readonly logger = new Logger(StationsController.name);

  @ApiOperation({
    description: 'This Endpoint is used to create a new station.',
  })
  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    try {
      const result = await this.stationsService.create(createStationDto);
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
    description: 'This Endpoint returns all stations.',
  })
  @Get()
  async findAll() {
    try {
      const result = await this.stationsService.findAll();
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
      'This Endpoint returns the station that corresponds to the specified id.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.stationsService.findOne(+id);
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
      'This Endpoint updates the station. Please only include the fields that you want to update.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    try {
      const result = await this.stationsService.update(+id, updateStationDto);
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
      'This Endpoint deletes the station that corresponds to the specified id.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.stationsService.remove(+id);
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
