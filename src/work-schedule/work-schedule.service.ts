import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkShift } from './work-shift/entities/work-shift.entity';
import { Repository } from 'typeorm';
import { Employee } from './work-shift/employee/entities/employee.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { IWorkScheduleService } from './work-schedule';

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectRepository(WorkShift)
    private readonly workShiftRepository: Repository<WorkShift>,
    @InjectRepository(WorkSchedule)
    private readonly workScheduleRepository: Repository<WorkSchedule>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createWorkScheduleDto: CreateWorkScheduleDto,
  ): Promise<IWorkScheduleService> {
    const { workShifts, employees } = createWorkScheduleDto;

    const createdEmployees = await this.employeeRepository.save(
      employees.map((employee) => ({
        ...employee,
      })),
    );

    const workSchedule = this.workScheduleRepository.create({
      workShifts: workShifts
        .map((createWorkShiftDto) => {
          const { startWorkShift, endWorkShift } = createWorkShiftDto;
          const employeeId = createdEmployees.find(
            (employee) =>
              employee.employeeIdentifier === employee.employeeIdentifier,
          )?.id;
          if (employeeId) {
            return this.workShiftRepository.create({
              startWorkShift: startWorkShift,
              endWorkShift: endWorkShift,
              employee: {
                id: employeeId,
              },
            });
          }
          return undefined;
        })
        .filter((data) => typeof data !== 'undefined'),
    });
    return {
      ...(await this.workScheduleRepository.save(workSchedule)),
      employees: createdEmployees,
    };
  }

  findAll() {
    return `This action returns all workSchedule`;
  }
}
