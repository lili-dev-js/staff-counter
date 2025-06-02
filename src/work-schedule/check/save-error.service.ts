import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from './error/entities/error.entity';
import { ErrorService } from './error/error.service';
import { TCheckEmployeeResponse } from './check';
import { IWorkScheduleService } from '../work-schedule';

@Injectable()
export class SaveErrorService {
  constructor(
    @InjectRepository(Error)
    private readonly errorService: ErrorService,
  ) {}

  async saveError(
    workScheduleResponse: IWorkScheduleService,
    workScheduleCheck: TCheckEmployeeResponse,
  ) {
    const { employees } = workScheduleResponse;

    if (typeof workScheduleCheck !== 'string') {
      const createErrorDto = workScheduleCheck
        .map((error) => {
          const employee = employees.find(
            (employee) =>
              employee.employeeIdentifier ===
              error?.employee.employeeIdentifier,
          );
          if (!employee) {
            return;
          }
          return {
            startFirstShift: error?.startFirstShift || 0,
            endLastShift: error?.endLastShift || 0,
            error: error?.error || '',
            workSchedule: workScheduleResponse,
            employee,
          };
        })
        .filter((data) => typeof data !== 'undefined');
      await this.errorService.create(createErrorDto);
    }

    return {
      id: workScheduleResponse.id,
      workScheduleCheck,
    };
  }
}
