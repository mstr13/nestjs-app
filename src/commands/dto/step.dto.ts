import { CompanyReportDto } from './company-report.dto';

export class StepDto {
  step: string;
  timestamp: number;
  companies: CompanyReportDto[];
  totalChargingStations: number[];
  totalChargingPower: number;
}
