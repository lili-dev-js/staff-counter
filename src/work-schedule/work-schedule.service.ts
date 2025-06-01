import { Injectable } from '@nestjs/common';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkShift } from '../work-shift/entities/work-shift.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { v4 as uuidv4 } from 'uuid';

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

  async create(createWorkScheduleDto: CreateWorkScheduleDto) {
    const { workShifts, employees } = createWorkScheduleDto;
    const checkScheduleId = uuidv4();

    const createdEmployees = await this.employeeRepository.save(
      employees.map((employee) => ({
        ...employee,
      })),
    );

    const workSchedule = this.workScheduleRepository.create({
      workShifts: workShifts
        .map((createWorkShiftDto) => {
          const { start_work_shift, end_work_shift } = createWorkShiftDto;
          const employeeId = createdEmployees.find(
            (employee) =>
              employee.employee_id_number === employee.employee_id_number,
          )?.id;
          if (employeeId) {
            return this.workShiftRepository.create({
              start_work_shift,
              end_work_shift,
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

  findOne(id: number) {
    return `This action returns a #${id} workSchedule`;
  }

  update(id: number, updateWorkScheduleDto: UpdateWorkScheduleDto) {
    return `This action updates a #${id} workSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} workSchedule`;
  }
}
