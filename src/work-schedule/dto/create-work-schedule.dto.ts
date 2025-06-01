import { IsNotEmpty, Validate } from 'class-validator';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { IsUniqueVariableInObjectsArray } from '../../validators/isUniqueVariableInObjectsArray';

export class CreateWorkScheduleDto {
  @IsNotEmpty()
  @Validate(IsUniqueVariableInObjectsArray, ['employee_id_number'])
  employees: CreateEmployeeDto[];

  @IsNotEmpty()
  workShifts: WorkShiftNoEmployeeDto[];
}
