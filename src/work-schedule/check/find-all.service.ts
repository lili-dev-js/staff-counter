import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSchedule } from '../entities/work-schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllService {
  constructor(
    @InjectRepository(WorkSchedule)
    private readonly workScheduleRepository: Repository<WorkSchedule>,
  ) {}

  findAll(limit = 10, offset = 0) {
    return this.workScheduleRepository.find({
      relations: ['errors.employee', 'workShifts.employee'],
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });
  }
}
