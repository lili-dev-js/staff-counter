import { Injectable } from '@nestjs/common';
import { CreateWorkShiftDto } from './dto/create-work-shift.dto';
import { UpdateWorkShiftDto } from './dto/update-work-shift.dto';
import { Employee } from '../employee/entities/employee.entity';
import { WorkShift } from './entities/work-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WorkShiftService {
  constructor(
    @InjectRepository(WorkShift)
    private readonly workShiftRepository: Repository<WorkShift>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createWorkShiftDto: CreateWorkShiftDto) {
    const { start_work_shift, end_work_shift, employee } = createWorkShiftDto;

    const workShift = this.workShiftRepository.create({
      start_work_shift,
      end_work_shift,
      employee: this.employeeRepository.create(employee),
    });

    return this.workShiftRepository.save(workShift);
    return 'This action adds a new workShift';
  }

  findAll() {
    return `This action returns all workShift`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workShift`;
  }

  update(id: number, updateWorkShiftDto: UpdateWorkShiftDto) {
    return `This action updates a #${id} workShift`;
  }

  remove(id: number) {
    return `This action removes a #${id} workShift`;
  }
}
