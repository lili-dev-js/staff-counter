import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from '../dto/create-work-schedule.dto';
import { CreateEmployeeDto } from '../work-shift/employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../work-shift/dto/create-work-shift.dto';
import { IWorkDaysEmployer, TCheckEmployeeResponse } from './check';

const ONE_DAY_IN_SECONDS = 24 * 3600;
const BREAK_IN_SECONDS = 11 * 3600;

const generateError = (
  error: string,
  workDaysEmployer: IWorkDaysEmployer,
  employee: CreateEmployeeDto,
) => {
  return {
    error: error,
    employee,
    ...workDaysEmployer,
  };
};

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

const checkEmployee = (
  employee: CreateEmployeeDto,
  workSifts: WorkShiftNoEmployeeDto[],
) => {
  const workSiftsEmployer = workSifts
    .filter(
      (workSift) => workSift.employeeIdentifier === employee.employeeIdentifier,
    )
    .sort((shiftA, shiftB) => shiftA.startWorkShift - shiftB.endWorkShift);

  const errors = workSiftsEmployer.reduce((acc, cur, i) => {
    if (cur.startWorkShift > cur.endWorkShift) {
      return [
        ...acc,
        generateError(
          'The shift ends before it starts',
          {
            startFirstShift: cur.startWorkShift,
            endLastShift: cur.endWorkShift,
          },
          employee,
        ),
      ];
    }

    const nextShift = workSiftsEmployer[i + 1];
    if (nextShift && cur.endWorkShift > nextShift.startWorkShift) {
      return [
        ...acc,
        generateError(
          'Several shift are ongoing at the same time',
          {
            startFirstShift: cur.startWorkShift,
            endLastShift: cur.endWorkShift,
          },
          employee,
        ),
      ];
    }
    return acc;
  }, []);

  const workDaysEmployer = workSiftsEmployer.reduce(
    (acc: Record<string, IWorkDaysEmployer>, cur) => {
      const dateStartShift = new Date(cur.startWorkShift * 1000);
      const dateStartWork: string = `${dateStartShift.getFullYear()} ${dateStartShift.getMonth()} ${dateStartShift.getDate()}`;
      const isAccStartShiftEarlier =
        acc[dateStartWork]?.startFirstShift &&
        acc[dateStartWork]?.startFirstShift < cur.startWorkShift;
      const isAccEndShiftElder =
        acc[dateStartWork]?.endLastShift &&
        acc[dateStartWork]?.endLastShift > cur.endWorkShift;

      return {
        ...acc,
        [dateStartWork]: {
          startFirstShift: isAccStartShiftEarlier
            ? acc[dateStartWork]?.startFirstShift
            : cur.startWorkShift,
          endLastShift: isAccEndShiftElder
            ? acc[dateStartWork]?.endLastShift
            : cur.endWorkShift,
        },
      };
    },
    {},
  );

  const workDaysEmployerArray = Object.values(workDaysEmployer);
  if (employee.typeWorkingHours === 'static') {
    return workDaysEmployerArray.map((workDayEmployer) => {
      if (
        workDayEmployer.startFirstShift + ONE_DAY_IN_SECONDS <
        workDayEmployer.endLastShift + BREAK_IN_SECONDS
      ) {
        return [
          ...errors,
          generateError('Break to short', workDayEmployer, employee),
        ];
      }
      return [...errors];
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
        return [
          ...errors,
          generateError('Break to short', workDayEmployer, employee),
        ];
      }
      return [...errors];
    });
  }
};

@Injectable()
export class CheckService {
  check(createWorkScheduleDto: CreateWorkScheduleDto): TCheckEmployeeResponse {
    const { workShifts, employees } = createWorkScheduleDto;

    const errors = employees
      .map((employee) => checkEmployee(employee, workShifts))
      .flat(2)
      .filter((data) => data);
    return errors.length > 0 ? errors : 'Work Schedule is correct';
  }
}
