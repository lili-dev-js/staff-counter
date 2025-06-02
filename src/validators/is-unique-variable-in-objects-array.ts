import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

type TCustomValidationArguments<T> = ValidationArguments & {
  constraints: Record<0, keyof T>;
};

@ValidatorConstraint({ name: 'IsUniqueVariableInObjectsArray', async: false })
@Injectable()
export class IsUniqueVariableInObjectsArray
  implements ValidatorConstraintInterface
{
  validate<T>(data: T[], args: TCustomValidationArguments<T>): boolean {
    return (
      [...new Set(data?.map((item) => item[args.constraints[0]]))].length ===
      data?.length
    );
  }

  defaultMessage<T>(args: TCustomValidationArguments<T>): string {
    return `Values '${args.constraints[0].toString()}' are not unique`;
  }
}
