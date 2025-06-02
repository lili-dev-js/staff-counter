import { IsNotEmpty, Validate } from 'class-validator';
import { IsUniqueVariableInObjectsArray } from '../../../validators/is-unique-variable-in-objects-array';
import { CreateEmployeeDto } from '../../work-shift/employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';

export class CreateCheckDto {
  @IsNotEmpty()
  @Validate(IsUniqueVariableInObjectsArray, ['employeeIdentifier'])
  employees: CreateEmployeeDto[];

  @IsNotEmpty()
  workShifts: WorkShiftNoEmployeeDto[];
}
