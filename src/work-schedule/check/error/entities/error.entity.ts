import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../../../employee/entities/employee.entity';
import { WorkSchedule } from '../../../entities/work-schedule.entity';

@Entity()
export class Error {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  start_first_shift: number;

  @Column({ type: 'int' })
  end_last_shift: number;

  @Column({ type: 'varchar' })
  error: string;

  @ManyToOne(() => Employee, (employee) => employee.errors)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.errors)
  @JoinColumn({ name: 'work_schedule_id' })
  workSchedule: WorkSchedule;
}
