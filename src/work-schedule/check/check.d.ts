import { CreateEmployeeDto } from '../work-shift/employee/dto/create-employee.dto';
import { Error } from './error/entities/error.entity';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateWorkShiftDto } from '../work-shift/dto/create-work-shift.dto';

export interface IWorkDaysEmployer {
  startFirstShift: number;
  endLastShift: number;
}

export class RawError extends OmitType(Error, [
  'workSchedule',
  'id',
  'employee',
] as const) {
  employee: CreateEmployeeDto;
}

export type TCheckEmployeeResponse = string | (RawError | undefined)[];
