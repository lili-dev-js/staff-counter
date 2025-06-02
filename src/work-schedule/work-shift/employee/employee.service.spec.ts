import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepository: Repository<Employee>;

  const mockEmployeeRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<Repository<Employee>>(
      getRepositoryToken(Employee),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save an employee', async () => {
      const dto: CreateEmployeeDto = {
        employeeIdentifier: 'z221',
        name: 'as1s1da',
        surname: 'ddfgd',
        typeWorkingHours: 'static',
      };

      const savedEmployee: Employee = {
        id: 1,
        ...dto,
        workShifts: [],
        errors: [],
      };

      mockEmployeeRepository.save.mockResolvedValue(savedEmployee);

      const result = await service.create(dto);

      expect(mockEmployeeRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: dto.name,
          surname: dto.surname,
          typeWorkingHours: dto.typeWorkingHours,
        }),
      );

      expect(result).toEqual(savedEmployee);
    });
  });

  describe('findAll', () => {
    it('should return static message', () => {
      expect(service.findAll()).toBe('This action returns all employee');
    });
  });
});
