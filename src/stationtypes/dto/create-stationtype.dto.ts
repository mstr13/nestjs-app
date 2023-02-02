import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStationtypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maxPower: number;
}
