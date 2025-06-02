import { Injectable } from '@nestjs/common';
import { CreateWorkShiftDto } from './dto/create-work-shift.dto';
import { Employee } from './employee/entities/employee.entity';
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
    const { startWorkShift, endWorkShift, employee } = createWorkShiftDto;

    const workShift = this.workShiftRepository.create({
      startWorkShift: startWorkShift,
      endWorkShift: endWorkShift,
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
}
