import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stationtype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxPower: number;
}
