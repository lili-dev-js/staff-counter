import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkScheduleService } from './work-schedule.service';
import { WorkShift } from './work-shift/entities/work-shift.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Employee } from './work-shift/employee/entities/employee.entity';

describe('WorkScheduleService', () => {
  let service: WorkScheduleService;

  const mockWorkShiftRepository = { create: jest.fn() };
  const mockWorkScheduleRepository = { create: jest.fn(), save: jest.fn() };
  const mockEmployeeRepository = { save: jest.fn() };

  const employeesDto = [
    {
      employeeIdentifier: 'z221',
      name: 'as1s1da',
      surname: 'ddfgd',
      typeWorkingHours: 'static',
    },
    {
      employeeIdentifier: 'z222',
      name: 'asda',
      surname: 'ddfgd',
      typeWorkingHours: 'elastic',
    },
  ];

  const workShiftsDto = [
    {
      startWorkShift: 1748944872,
      endWorkShift: 174894847,
      employeeIdentifier: 'z222',
    },
    {
      startWorkShift: 1748901672,
      endWorkShift: 1748944872,
      employeeIdentifier: 'z221',
    },

  ];

  const createdEmployees = [
    {
      id: 1,
      employeeIdentifier: 'z221',
      name: 'as1s1da',
      surname: 'ddfgd',
      typeWorkingHours: 'static',
    },
    {
      id: 2,
      employeeIdentifier: 'z222',
      name: 'asda',
      surname: 'ddfgd',
      typeWorkingHours: 'elastic',
    },
  ];

  const createdWorkShifts = [
    {
      startWorkShift: 1748901672,
      endWorkShift: 1748944872,
      employee: { id: 1 },
    },
    {
      startWorkShift: 1748944872,
      endWorkShift: 1748948472,
      employee: { id: 2 },
    },
  ];

  const createdWorkSchedule = { id: 1, workShifts: createdWorkShifts };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkScheduleService,
        {
          provide: getRepositoryToken(WorkShift),
          useValue: mockWorkShiftRepository,
        },
        {
          provide: getRepositoryToken(WorkSchedule),
          useValue: mockWorkScheduleRepository,
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    service = module.get<WorkScheduleService>(WorkScheduleService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create employees, workShifts and save workSchedule', async () => {
      mockEmployeeRepository.save.mockResolvedValue(createdEmployees);

      mockWorkShiftRepository.create.mockImplementation(
        ({ startWorkShift, endWorkShift, employee }) => ({
          startWorkShift,
          endWorkShift,
          employee,
        }),
      );

      mockWorkScheduleRepository.create.mockReturnValue(createdWorkSchedule);
      mockWorkScheduleRepository.save.mockResolvedValue(createdWorkSchedule);

      const result = await service.create({
        employees: employeesDto,
        workShifts: workShiftsDto,
      });

      expect(mockEmployeeRepository.save).toHaveBeenCalledWith(employeesDto);
      expect(mockWorkShiftRepository.create).toHaveBeenCalledTimes(
        workShiftsDto.length,
      );

      expect(mockWorkScheduleRepository.create).toHaveBeenCalledWith({
        workShifts: createdWorkShifts,
      });

      expect(mockWorkScheduleRepository.save).toHaveBeenCalledWith(
        createdWorkSchedule,
      );

      expect(result).toEqual({
        ...createdWorkSchedule,
        employees: createdEmployees,
      });
    });
  });

  describe('findAll', () => {
    it('should return string', () => {
      expect(service.findAll()).toBe('This action returns all workSchedule');
    });
  });
});
