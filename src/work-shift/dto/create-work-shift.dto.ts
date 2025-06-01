import {
  IsInt,
  IsNotEmpty, Min,
} from 'class-validator';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateWorkShiftDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  start_work_shift: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  end_work_shift: number;

  @IsNotEmpty()
  employee: CreateEmployeeDto;
}

export class WorkShiftNoEmployeeDto extends OmitType(CreateWorkShiftDto, [
  'employee',
] as const) {
  @IsNotEmpty()
  employee_id: number;
}
