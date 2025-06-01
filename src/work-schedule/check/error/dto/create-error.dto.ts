import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateEmployeeDto } from '../../../../employee/dto/create-employee.dto';
import { WorkSchedule } from '../../../entities/work-schedule.entity';

export class CreateErrorDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  start_first_shift: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  end_last_shift: number;

  @IsString()
  error: string;

  @IsNotEmpty()
  employee: CreateEmployeeDto;

  @IsNotEmpty()
  work_schedule: WorkSchedule;
}
