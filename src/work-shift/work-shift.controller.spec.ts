import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftController } from './work-shift.controller';
import { WorkShiftService } from './work-shift.service';

describe('WorkShiftController', () => {
  let controller: WorkShiftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkShiftController],
      providers: [WorkShiftService],
    }).compile();

    controller = module.get<WorkShiftController>(WorkShiftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
