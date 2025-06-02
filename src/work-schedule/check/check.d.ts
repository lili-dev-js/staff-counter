import { CreateEmployeeDto } from '../work-shift/employee/dto/create-employee.dto';

export interface IWorkDaysEmployer {
  startFirstShift: number;
  endLastShift: number;
}

export type TCheckEmployeeResponse =
  | string
  | (
      | {
          startFirstShift: number;
          endLastShift: number;
          error: string;
          employee: CreateEmployeeDto;
        }
      | undefined
    )[];
