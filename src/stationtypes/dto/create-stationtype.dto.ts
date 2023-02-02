import { IsNotEmpty, IsInt, IsString } from 'class-validator';
export class CreateStationtypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  maxPower: number;
}
