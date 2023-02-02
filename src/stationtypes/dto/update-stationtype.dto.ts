import { PartialType } from '@nestjs/mapped-types';
import { CreateStationtypeDto } from './create-stationtype.dto';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateStationtypeDto extends PartialType(CreateStationtypeDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
