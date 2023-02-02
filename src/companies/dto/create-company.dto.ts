import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  parentId: number;
}
