import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkShift } from '../work-shift/entities/work-shift.entity';
import { Error } from '../check/error/entities/error.entity';

@Entity()
export class WorkSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => WorkShift, (workShift) => workShift.workSchedule, {
    cascade: true,
  })
  @JoinColumn({ name: 'work_shift_ids' })
  workShifts: WorkShift[];

  @OneToMany(() => Error, (error) => error.workSchedule, {
    cascade: true,
  })
  @JoinColumn({ name: 'errors_ids' })
  errors: Error[];
}
