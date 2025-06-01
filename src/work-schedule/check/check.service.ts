import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from '../dto/create-work-schedule.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';

const ONE_DAY_IN_SECONDS = 24 * 3600;
const BREAK_IN_SECONDS = 11 * 3600;

interface IWorkDaysEmployer {
  startFirstShift: number;
  endLastShift: number;
}

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
  const workSiftsEmployer = workSifts.filter(
    (workSift) => workSift.employee_id_number === employee.employee_id_number,
  );
  const workDaysEmployer = workSiftsEmployer.reduce(
    (acc: Record<string, IWorkDaysEmployer>, cur) => {
      const dateStartShift = new Date(cur.start_work_shift * 1000);
      const dateStartWork: string = `${dateStartShift.getFullYear()} ${dateStartShift.getMonth()} ${dateStartShift.getDate()}`;
      const isAccStartShiftEarlier =
        acc[dateStartWork]?.startFirstShift &&
        acc[dateStartWork]?.startFirstShift < cur.start_work_shift;
      const isAccEndShiftElder =
        acc[dateStartWork]?.endLastShift &&
        acc[dateStartWork]?.endLastShift > cur.end_work_shift;

      return {
        ...acc,
        [dateStartWork]: {
          startFirstShift: isAccStartShiftEarlier
            ? acc[dateStartWork]?.startFirstShift
            : cur.start_work_shift,
          endLastShift: isAccEndShiftElder
            ? acc[dateStartWork]?.endLastShift
            : cur.end_work_shift,
        },
      };
    },
    {},
  );

  const workDaysEmployerArray = Object.values(workDaysEmployer);

  if (employee.type_working_hours === 'static') {
    return workDaysEmployerArray.map((workDayEmployer) => {
      if (
        workDayEmployer.startFirstShift + ONE_DAY_IN_SECONDS <
        workDayEmployer.endLastShift + BREAK_IN_SECONDS
      ) {
        return generateError('Break to short', workDayEmployer, employee);
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
        return generateError('Break to short', workDayEmployer, employee);
      }
    });
  }
};

@Injectable()
export class CheckService {
  check(createWorkScheduleDto: CreateWorkScheduleDto) {
    const { workShifts, employees } = createWorkScheduleDto;

    const errors = employees
      .map((employee) => checkEmployee(employee, workShifts))
      .flat(2)
      .filter((data) => data);
    return errors.length > 0 ? errors : 'Work Schedule is correct';
  }
}
