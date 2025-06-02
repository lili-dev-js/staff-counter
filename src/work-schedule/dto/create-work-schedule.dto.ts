import { IsNotEmpty, Validate } from 'class-validator';
import { WorkShiftNoEmployeeDto } from '../work-shift/dto/create-work-shift.dto';
import { CreateEmployeeDto } from '../work-shift/employee/dto/create-employee.dto';
import { IsUniqueVariableInObjectsArray } from '../../validators/is-unique-variable-in-objects-array';

export class CreateWorkScheduleDto {
  @IsNotEmpty()
  @Validate(IsUniqueVariableInObjectsArray, ['employeeIdentifier'])
  employees: CreateEmployeeDto[];

  @IsNotEmpty()
  workShifts: WorkShiftNoEmployeeDto[];
}
