import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from './error/entities/error.entity';
import { TCheckEmployeeResponse } from './check';
import { IWorkScheduleService } from '../work-schedule';
import { Repository } from 'typeorm';

@Injectable()
export class SaveErrorService {
  constructor(
    @InjectRepository(Error)
    private readonly errorRepository: Repository<Error>,
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
            workSchedule: {
              id: workScheduleResponse.id,
            },
            employee,
          };
        })
        .filter((data) => typeof data !== 'undefined');
      return this.errorRepository.save(createErrorDto);
    }

    return {
      id: workScheduleResponse.id,
      workScheduleCheck,
    };
  }
}
