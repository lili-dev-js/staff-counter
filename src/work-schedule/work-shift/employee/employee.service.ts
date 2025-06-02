import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee: Employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.surname = createEmployeeDto.surname;
    employee.typeWorkingHours = createEmployeeDto.typeWorkingHours;
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return `This action returns all employee`;
  }
}
