import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { WorkScheduleService } from '../work-schedule.service';

@Controller('work-schedule/check')
export class CheckController {
  constructor(
    private readonly checkService: CheckService,
    private readonly workScheduleService: WorkScheduleService,
  ) {}

  @Post()
  check(@Body() createCheckDto: CreateCheckDto) {
    this.workScheduleService.create(createCheckDto);

    return this.checkService.check(createCheckDto);
  }
}
