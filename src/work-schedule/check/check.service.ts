import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from '../dto/create-work-schedule.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';

const ONE_DAY_IN_SECONDS = 24 * 3600;
const BREAK_IN_SECONDS = 11 * 3600;

const getElasticEndShift = (
  startFirstShift: number,
  startShiftNextDay?: number,
) => {
  if (
    startShiftNextDay &&
    startFirstShift + ONE_DAY_IN_SECONDS > startShiftNextDay
  ) {
    return startShiftNextDay;
  }
  return startFirstShift + ONE_DAY_IN_SECONDS;
};

@Injectable()
export class CheckService {
  check(createWorkScheduleDto: CreateWorkScheduleDto) {
    const checkEmployee = (
      employee: CreateEmployeeDto,
      workSifts: WorkShiftNoEmployeeDto[],
    ) => {
      const workSiftsEmployer = workSifts.filter(
        (workSift) =>
          workSift.employee_id_number === employee.employee_id_number,
      );
      const workDaysEmployer = workSiftsEmployer.reduce(
        (
          acc: Record<
            string,
            {
              startFirstShift: number;
              endLastShift: number;
            }
          >,
          cur,
        ) => {
          const dateStartShift = new Date(cur.start_work_shift * 1000);
          const dateStartWork: string = `${dateStartShift.getFullYear()} ${dateStartShift.getMonth()} ${dateStartShift.getDate()}`;
          return {
            ...acc,
            [dateStartWork]: {
              startFirstShift:
                acc[dateStartWork]?.startFirstShift &&
                acc[dateStartWork]?.startFirstShift < cur.start_work_shift
                  ? acc[dateStartWork]?.startFirstShift
                  : cur.start_work_shift,
              endLastShift:
                acc[dateStartWork]?.endLastShift &&
                acc[dateStartWork]?.endLastShift > cur.end_work_shift
                  ? acc[dateStartWork]?.endLastShift
                  : cur.end_work_shift,
            },
          };
        },
        {},
      );

      const workDaysEmployerArray = Object.values(workDaysEmployer);

      if (employee.type_working_hours === 'not elastic') {
        return workDaysEmployerArray.map((workDayEmployer) => {
          if (
            workDayEmployer.startFirstShift + ONE_DAY_IN_SECONDS <
            workDayEmployer.endLastShift + BREAK_IN_SECONDS
          ) {
            return 'Break to short';
          }
        });
      } else {
        return workDaysEmployerArray.map((workDayEmployer, i) => {
          if (
            getElasticEndShift(
              workDayEmployer.startFirstShift,
              workDaysEmployerArray[i + 1]?.startFirstShift,
            ) <
            workDayEmployer.endLastShift + BREAK_IN_SECONDS
          ) {
            return 'Break to short';
          }
        });
      }
    };
    const { workShifts, employees } = createWorkScheduleDto;

    const errors = employees.map((employee) =>
      checkEmployee(employee, workShifts),
    );
    console.log(errors);
  }
}
