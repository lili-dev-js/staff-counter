import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Surname must have at least 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Surname does not allow other than alpha numeric chars.',
  })
  surname: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'Employee_id_number must have at least 3 characters.',
  })
  @IsAlphanumeric(undefined, {
    message:
      'Employee_id_number does not allow other than alpha numeric chars.',
  })
  employee_id_number: string;

  @IsString()
  @IsEnum(['elastic', 'static'])
  type_working_hours: string;
}
