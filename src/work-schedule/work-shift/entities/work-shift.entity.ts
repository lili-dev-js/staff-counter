import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { WorkSchedule } from '../../entities/work-schedule.entity';

@Entity()
export class WorkShift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  startWorkShift: number;

  @Column({ type: 'int' })
  endWorkShift: number;

  @ManyToOne(() => Employee, (employee) => employee.workShifts, {
    cascade: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.workShifts)
  @JoinColumn({ name: 'check_schedule_id' })
  workSchedule: WorkSchedule;
}
