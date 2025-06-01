import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from '../dto/create-work-schedule.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { WorkShiftNoEmployeeDto } from '../../work-shift/dto/create-work-shift.dto';
import { Repository } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSchedule } from '../entities/work-schedule.entity';

const ONE_DAY_IN_SECONDS = 24 * 3600;
const BREAK_IN_SECONDS = 11 * 3600;

interface IWorkDaysEmployer {
  start_first_shift: number;
  end_last_shift: number;
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
  start_first_shift: number,
  startShiftNextDay?: number,
) => {
  if (
    startShiftNextDay &&
    start_first_shift + ONE_DAY_IN_SECONDS > startShiftNextDay
  ) {
    return startShiftNextDay;
  }
  return start_first_shift + ONE_DAY_IN_SECONDS;
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
        acc[dateStartWork]?.start_first_shift &&
        acc[dateStartWork]?.start_first_shift < cur.start_work_shift;
      const isAccEndShiftElder =
        acc[dateStartWork]?.end_last_shift &&
        acc[dateStartWork]?.end_last_shift > cur.end_work_shift;

      return {
        ...acc,
        [dateStartWork]: {
          start_first_shift: isAccStartShiftEarlier
            ? acc[dateStartWork]?.start_first_shift
            : cur.start_work_shift,
          end_last_shift: isAccEndShiftElder
            ? acc[dateStartWork]?.end_last_shift
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
        workDayEmployer.start_first_shift + ONE_DAY_IN_SECONDS <
        workDayEmployer.end_last_shift + BREAK_IN_SECONDS
      ) {
        return generateError('Break to short', workDayEmployer, employee);
      }
    });
  } else {
    return workDaysEmployerArray.map((workDayEmployer, i) => {
      if (
        getElasticEndShift(
          workDayEmployer.start_first_shift,
          workDaysEmployerArray[i + 1]?.start_first_shift,
        ) <
        workDayEmployer.end_last_shift + BREAK_IN_SECONDS
      ) {
        return generateError('Break to short', workDayEmployer, employee);
      }
    });
  }
};

@Injectable()
export class CheckService {
  @InjectRepository(WorkSchedule)
  private readonly workScheduleRepository: Repository<WorkSchedule>;

  check(createWorkScheduleDto: CreateWorkScheduleDto) {
    const { workShifts, employees } = createWorkScheduleDto;

    const errors = employees
      .map((employee) => checkEmployee(employee, workShifts))
      .flat(2)
      .filter((data) => data);
    return errors.length > 0 ? errors : 'Work Schedule is correct';
  }

  findAll(limit = 50, offset = 0): Promise<any[]> {
    return this.workScheduleRepository.find({
      relations: ['errors.employee', 'workShifts.employee'],
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });
  }
}
