import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationtypesService } from './stationtypes.service';
import { CreateStationtypeDto } from './dto/create-stationtype.dto';
import { UpdateStationtypeDto } from './dto/update-stationtype.dto';

@Controller('stationtypes')
export class StationtypesController {
  constructor(private readonly stationtypesService: StationtypesService) {}

  @Post()
  create(@Body() createStationtypeDto: CreateStationtypeDto) {
    return this.stationtypesService.create(createStationtypeDto);
  }

  @Get()
  findAll() {
    return this.stationtypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationtypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationtypeDto: UpdateStationtypeDto) {
    return this.stationtypesService.update(+id, updateStationtypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationtypesService.remove(+id);
  }
}
