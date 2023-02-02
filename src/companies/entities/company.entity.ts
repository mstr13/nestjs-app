import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parentId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'parentId' })
  parent: Company;
}
