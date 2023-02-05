import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStationtypeDto {
  @ApiProperty({
    description: 'The name of the station type',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The max power of this station type',
  })
  @IsInt()
  @IsNotEmpty()
  maxPower: number;
}
