import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../../work-shift/employee/entities/employee.entity';
import { WorkSchedule } from '../../../entities/work-schedule.entity';

@Entity()
export class Error {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  startFirstShift: number;

  @Column({ type: 'int' })
  endLastShift: number;

  @Column({ type: 'varchar' })
  error: string;

  @ManyToOne(() => Employee, (employee) => employee.errors)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.errors)
  @JoinColumn({ name: 'work_schedule_id' })
  workSchedule: WorkSchedule;
}
