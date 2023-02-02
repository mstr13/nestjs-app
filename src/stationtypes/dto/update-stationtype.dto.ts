import { PartialType } from '@nestjs/swagger';
import { CreateStationtypeDto } from './create-stationtype.dto';

export class UpdateStationtypeDto extends PartialType(CreateStationtypeDto) {}
