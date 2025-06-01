import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkShift } from '../../work-shift/entities/work-shift.entity';

@Entity()
export class WorkSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => WorkShift, (workShift) => workShift.workSchedule, {
    cascade: true,
  })
  @JoinColumn({ name: 'work_shift_ids' })
  workShifts: WorkShift[];
}
