import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStationDto {
  @ApiProperty({
    description: 'The name of the station',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The id of the company that owns the station',
  })
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    description: 'The id of the station type',
  })
  @IsInt()
  @IsNotEmpty()
  stationTypeId: number;

  @ApiProperty({
    description:
      'The status of the station (charging: true; not charging:false)',
  })
  @IsBoolean()
  @IsOptional()
  isCharging: boolean;
}
