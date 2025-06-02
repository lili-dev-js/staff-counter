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

//workDay is a set of shifts starting on the same day
const convertShipToWorkDays = (workShiftsEmployer: WorkShiftNoEmployeeDto[]) =>
  workShiftsEmployer.reduce((acc: Record<string, IWorkDaysEmployer>, cur) => {
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
  }, {});

const checkBreaks = (
  employee: CreateEmployeeDto,
  workDaysEmployer: Record<string, IWorkDaysEmployer>,
) => {
  const workDaysEmployerArray = Object.values(workDaysEmployer);
  return workDaysEmployerArray.map((workDayEmployer, i) => {
    if (
      (employee.typeWorkingHours === 'static' &&
        workDayEmployer.startFirstShift + ONE_DAY_IN_SECONDS <
          workDayEmployer.endLastShift + BREAK_IN_SECONDS) ||
      getElasticEndShift(
        workDayEmployer.startFirstShift,
        workDaysEmployerArray[i + 1]?.startFirstShift,
      ) <
        workDayEmployer.endLastShift + BREAK_IN_SECONDS
    ) {
      return [generateError('Break to short', workDayEmployer, employee)];
    }
  });
};

const sortAndFilterShiftEmployee = (
  employee: CreateEmployeeDto,
  workShifts: WorkShiftNoEmployeeDto[],
) =>
  workShifts
    .filter(
      (workSift) => workSift.employeeIdentifier === employee.employeeIdentifier,
    )
    .sort((shiftA, shiftB) => shiftA.startWorkShift - shiftB.endWorkShift);

const checkEmployee = (
  employee: CreateEmployeeDto,
  workShifts: WorkShiftNoEmployeeDto[],
) => {
  const workShiftsEmployer = sortAndFilterShiftEmployee(employee, workShifts);

  const errors = workShiftsEmployer.reduce((acc, cur, i) => {
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

    const nextShift = workShiftsEmployer[i + 1];
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

  const workDaysEmployer = convertShipToWorkDays(workShiftsEmployer);

  return [...errors, checkBreaks(employee, workDaysEmployer)];
};

@Injectable()
export class CheckService {
  check(createWorkScheduleDto: CreateWorkScheduleDto): TCheckEmployeeResponse {
    const { workShifts, employees } = createWorkScheduleDto;

    const errors = employees
      .map((employee) => checkEmployee(employee, workShifts))
      .flat(3)
      .filter((data) => data);
    return errors.length > 0 ? errors : 'Work Schedule is correct';
  }
}
