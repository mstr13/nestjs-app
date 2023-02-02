import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsNotEmpty()
  stationId: number;

  @IsBoolean()
  @IsOptional()
  isCharging: boolean;
}
