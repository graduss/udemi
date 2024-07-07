import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportEntit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
