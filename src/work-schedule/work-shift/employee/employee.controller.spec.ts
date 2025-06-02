import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  let mockEmployeeService: {
    create: jest.Mock;
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    mockEmployeeService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService }],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call employeeService.create and return the result', async () => {
      const dto: CreateEmployeeDto = {
        employeeIdentifier: 'z221',
        name: 'as1s1da',
        surname: 'ddfgd',
        typeWorkingHours: 'static',
      };
      const createdEmployee = { id: 1, ...dto };

      mockEmployeeService.create.mockResolvedValue(createdEmployee);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findAll', () => {
    it('should call employeeService.findAll and return the result', async () => {
      const employees = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      mockEmployeeService.findAll.mockResolvedValue(employees);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(employees);
    });
  });
});
