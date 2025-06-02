import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftService } from './work-shift.service';

describe('WorkShiftService', () => {
  let service: WorkShiftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkShiftService],
    }).compile();

    service = module.get<WorkShiftService>(WorkShiftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
