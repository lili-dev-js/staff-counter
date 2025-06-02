import { IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { IsUniqueVariableInObjectsArray } from '../../../validators/is-unique-variable-in-objects-array';
import { CreateEmployeeDto } from '../../work-shift/employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';
import { Type } from 'class-transformer';

export class CreateCheckDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeDto)
  @Validate(IsUniqueVariableInObjectsArray, ['employeeIdentifier'])
  employees: CreateEmployeeDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkShiftNoEmployeeDto)
  workShifts: WorkShiftNoEmployeeDto[];
}
