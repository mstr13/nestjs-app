import { PartialType } from '@nestjs/mapped-types';
import { CreateStationDto } from './create-station.dto';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateStationDto extends PartialType(CreateStationDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
