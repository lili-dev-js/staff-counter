import { Test, TestingModule } from '@nestjs/testing';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { FindAllService } from './find-all.service';
import { WorkScheduleService } from '../work-schedule.service';
import { SaveErrorService } from './save-error.service';
import { CreateCheckDto } from './dto/create-check.dto';

describe('CheckController', () => {
  let controller: CheckController;

  const mockCheckService = { check: jest.fn() };
  const mockFindAllService = { findAll: jest.fn() };
  const mockWorkScheduleService = { create: jest.fn() };
  const mockSaveErrorService = { saveError: jest.fn() };

  const createCheckDto: CreateCheckDto = {

    "employees":[{
      "employeeIdentifier":"z221",
      "name":"as1s1da",
      "surname":"ddfgd",
      "typeWorkingHours":"static"
    },
      {
        "employeeIdentifier":"z222",
        "name":"asda",
        "surname":"ddfgd",
        "typeWorkingHours":"elastic"
      }],
    "workShifts":[
      {
        "startWorkShift":1748901672,
        "endWorkShift":1748944872,
        "employeeIdentifier":"z221"
      },
      {
        "startWorkShift":1748944872,
        "endWorkShift":174894847,
        "employeeIdentifier":"z221"
      }
    ]
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckController],
      providers: [
        { provide: CheckService, useValue: mockCheckService },
        { provide: FindAllService, useValue: mockFindAllService },
        { provide: WorkScheduleService, useValue: mockWorkScheduleService },
        { provide: SaveErrorService, useValue: mockSaveErrorService },
      ],
    }).compile();

    controller = module.get<CheckController>(CheckController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check', () => {
    it('should call services and return saveError result', async () => {
      const workScheduleResponse = { id: 1, data: 'workSchedule' };
      const workScheduleCheck = { valid: true };
      const saveErrorResult = { saved: true };

      mockWorkScheduleService.create.mockResolvedValue(workScheduleResponse);
      mockCheckService.check.mockResolvedValue(workScheduleCheck);
      mockSaveErrorService.saveError.mockReturnValue(saveErrorResult);

      const result = await controller.check(createCheckDto);

      expect(mockWorkScheduleService.create).toHaveBeenCalledWith(createCheckDto);
      expect(mockCheckService.check).toHaveBeenCalledWith(createCheckDto);
      expect(mockSaveErrorService.saveError).toHaveBeenCalledWith(
        workScheduleResponse,
        workScheduleCheck,
      );
      expect(result).toBe(saveErrorResult);
    });
  });

  describe('findAll', () => {
    it('should call findAllService.findAll and return result', async () => {
      const findAllResult = [{ id: 1 }, { id: 2 }];

      mockFindAllService.findAll.mockResolvedValue(findAllResult);

      const result = await controller.findAll();

      expect(mockFindAllService.findAll).toHaveBeenCalled();
      expect(result).toEqual(findAllResult);
    });
  });
});
