import { IsNotEmpty, Validate } from 'class-validator';
import { IsUniqueVariableInObjectsArray } from '../../../validators/isUniqueVariableInObjectsArray';
import { CreateEmployeeDto } from '../../../employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../../work-shift/dto/create-work-shift.dto';

export class CreateCheckDto {
  @IsNotEmpty()
  @Validate(IsUniqueVariableInObjectsArray, ['employee_id_number'])
  employees: CreateEmployeeDto[];

  @IsNotEmpty()
  workShifts: WorkShiftNoEmployeeDto[];
}
