import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftController } from './work-shift.controller';
import { WorkShiftService } from './work-shift.service';
import { CreateWorkShiftDto } from './dto/create-work-shift.dto';

describe('WorkShiftController', () => {
  let controller: WorkShiftController;
  let service: WorkShiftService;

  const shiftDto: CreateWorkShiftDto = {
    startWorkShift: 1748944872,
    endWorkShift: 174894847,
    employee: {
      employeeIdentifier: 'z221',
      name: 'as1s1da',
      surname: 'ddfgd',
      typeWorkingHours: 'static',
    },
  };

  const shiftEntity = { id: 1, ...shiftDto };

  const mockWorkShiftService = {
    create: jest.fn().mockResolvedValue(shiftEntity),
    findAll: jest
      .fn()
      .mockResolvedValue([
        shiftEntity,
        { ...shiftEntity, id: 2, employeeIdentifier: 'z222' },
      ]),
    findOne: jest.fn().mockResolvedValue(shiftEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkShiftController],
      providers: [
        { provide: WorkShiftService, useValue: mockWorkShiftService },
      ],
    }).compile();

    controller = module.get<WorkShiftController>(WorkShiftController);
    service = module.get<WorkShiftService>(WorkShiftService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call create and return result', async () => {
    const result = await controller.create(shiftDto);
    expect(service.create).toHaveBeenCalledWith(shiftDto);
    expect(result).toEqual(shiftEntity);
  });

  it('should call findAll and return result', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      shiftEntity,
      { ...shiftEntity, id: 2, employeeIdentifier: 'z222' },
    ]);
  });

  it('should call findOne with numeric id and return result', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(shiftEntity);
  });
});
