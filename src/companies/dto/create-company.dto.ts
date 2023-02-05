import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    type: String,
    description: 'The name of the company',
})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The id of the parent company',
  })
  @IsInt()
  @IsOptional()
  parentId: number;
}
