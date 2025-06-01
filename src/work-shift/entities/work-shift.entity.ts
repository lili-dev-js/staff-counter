import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { WorkSchedule } from '../../work-schedule/entities/work-schedule.entity';

@Entity()
export class WorkShift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  start_work_shift: number;

  @Column({ type: 'int' })
  end_work_shift: number;

  @ManyToOne(() => Employee, (employee) => employee.workShifts, {
    cascade: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.workShifts)
  @JoinColumn({ name: 'check_schedule_id' })
  workSchedule: WorkSchedule;
}
