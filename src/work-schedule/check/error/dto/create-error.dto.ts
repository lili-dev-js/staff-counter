import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateEmployeeDto } from '../../../work-shift/employee/dto/create-employee.dto';

export class CreateErrorDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  startFirstShift: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  endLastShift: number;

  @IsString()
  error: string;

  @IsNotEmpty()
  employee: CreateEmployeeDto;

  @IsNotEmpty()
  workSchedule: {
    id: number;
  };
}
