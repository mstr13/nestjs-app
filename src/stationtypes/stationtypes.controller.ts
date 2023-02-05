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

@Controller('stationtypes')
export class StationtypesController {
  constructor(private readonly stationtypesService: StationtypesService) {}

  private readonly logger = new Logger(StationtypesController.name);

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
