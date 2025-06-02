import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateWorkShiftDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  startWorkShift: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  endWorkShift: number;

  @IsNotEmpty()
  employee: CreateEmployeeDto;
}

export class WorkShiftNoEmployeeDto extends OmitType(CreateWorkShiftDto, [
  'employee',
] as const) {
  @IsNotEmpty()
  employeeIdentifier: string;
}
