import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkShift } from '../../entities/work-shift.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  employeeIdentifier: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  surname: string;

  @Column({ type: 'enum', enum: ['elastic', 'static'] })
  typeWorkingHours: string;

  @OneToMany(() => WorkShift, (workShift) => workShift.employee)
  workShifts: WorkShift[];

  @OneToMany(() => WorkShift, (error) => error.employee)
  errors: Error[];
}
