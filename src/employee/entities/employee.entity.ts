import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkShift } from '../../work-shift/entities/work-shift.entity';
@Index(
  'employee_unique_id_schedule',
  ['employee_id_number', 'check_schedule_id'],
  { unique: true },
)
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  employee_id_number: string;

  @Column({ type: 'varchar', length: 90 })
  check_schedule_id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  surname: string;

  @Column({ type: 'enum', enum: ['elastic', 'not elastic'] })
  type_working_hours: string;

  @OneToMany(() => WorkShift, (workShift) => workShift.employee)
  workShifts: WorkShift[];
}
