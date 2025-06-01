import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkShift } from '../../work-shift/entities/work-shift.entity';


@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  employee_id_number: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  surname: string;

  @Column({ type: 'enum', enum: ['elastic', 'static'] })
  type_working_hours: string;

  @OneToMany(() => WorkShift, (workShift) => workShift.employee)
  workShifts: WorkShift[];

  @OneToMany(() => WorkShift, (error) => error.employee)
  errors: Error[];
}
