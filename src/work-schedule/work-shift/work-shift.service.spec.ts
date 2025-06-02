import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftService } from './work-shift.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkShift } from './entities/work-shift.entity';
import { Employee } from './employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateWorkShiftDto } from './dto/create-work-shift.dto';

describe('WorkShiftService', () => {
  let service: WorkShiftService;
  let workShiftRepo: Repository<WorkShift>;
  let employeeRepo: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkShiftService,
        {
          provide: getRepositoryToken(WorkShift),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WorkShiftService>(WorkShiftService);
    workShiftRepo = module.get<Repository<WorkShift>>(getRepositoryToken(WorkShift));
    employeeRepo = module.get<Repository<Employee>>(getRepositoryToken(Employee));
  });

  describe('create', () => {
    it('should create and save a new workShift', async () => {
      const createWorkShiftDto: CreateWorkShiftDto = {
        startWorkShift: 1748901672,
        endWorkShift: 1748901672,
        employee: {
          employeeIdentifier: 'z221',
          name: 'as1s1da',
          surname: 'ddfgd',
          typeWorkingHours: 'static',
        },
      };

      const createdEmployee = { ...createWorkShiftDto.employee } as Employee;
      const createdWorkShift = {
        id: 1,
        startWorkShift: createWorkShiftDto.startWorkShift,
        endWorkShift: createWorkShiftDto.endWorkShift,
        employee: createdEmployee,
      } as WorkShift;

      jest.spyOn(employeeRepo, 'create').mockReturnValue(createdEmployee);
      jest.spyOn(workShiftRepo, 'create').mockReturnValue(createdWorkShift);
      jest.spyOn(workShiftRepo, 'save').mockResolvedValue(createdWorkShift);

      const result = await service.create(createWorkShiftDto);

      expect(employeeRepo.create).toHaveBeenCalledWith(createWorkShiftDto.employee);
      expect(workShiftRepo.create).toHaveBeenCalledWith({
        startWorkShift: createWorkShiftDto.startWorkShift,
        endWorkShift: createWorkShiftDto.endWorkShift,
        employee: createdEmployee,
      });
      expect(workShiftRepo.save).toHaveBeenCalledWith(createdWorkShift);
      expect(result).toEqual(createdWorkShift);
    });
  });
});
