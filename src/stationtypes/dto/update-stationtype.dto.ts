import { PartialType } from '@nestjs/mapped-types';
import { CreateStationtypeDto } from './create-stationtype.dto';

export class UpdateStationtypeDto extends PartialType(CreateStationtypeDto) {}
