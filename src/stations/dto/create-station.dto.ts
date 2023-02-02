import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  stationId: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCharging: boolean;
}
