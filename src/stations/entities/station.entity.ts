import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Stationtype } from '../../stationtypes/entities/stationtype.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  companyId: number;

  @Column()
  stationTypeId: number;

  @Column({ default: false })
  isCharging: boolean;

  @ManyToOne(() => Company, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => Stationtype, { nullable: false })
  @JoinColumn({ name: 'stationTypeId' })
  stationType: Stationtype;
}
