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
    message: 'employeeIdentifier must have at least 3 characters.',
  })
  @IsAlphanumeric(undefined, {
    message:
      'employeeIdentifier does not allow other than alpha numeric chars.',
  })
  employeeIdentifier: string;

  @IsString()
  @IsEnum(['elastic', 'static'])
  typeWorkingHours: string;
}
