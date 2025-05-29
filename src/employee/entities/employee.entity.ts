import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  surname: string;

  @Column({ type: 'enum', enum: ['elastic', 'not elastic'] })
  type_working_hours: string;
}
