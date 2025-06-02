import { Employee } from './work-shift/employee/entities/employee.entity';
import { WorkShift } from './work-shift/entities/work-shift.entity';
import { CreateErrorDto } from './check/error/dto/create-error.dto';

export interface IWorkScheduleService {
  employees: Employee[];
  id: number;
  workShifts: WorkShift[];
  errors: CreateErrorDto[];
}
