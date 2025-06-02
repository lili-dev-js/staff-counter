import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { WorkScheduleService } from '../work-schedule.service';
import { FindAllService } from './find-all.service';
import { SaveErrorService } from './save-error.service';

@Controller('work-schedule/check')
export class CheckController {
  constructor(
    private readonly checkService: CheckService,
    private readonly findAllService: FindAllService,
    private readonly workScheduleService: WorkScheduleService,
    private readonly saveErrorService: SaveErrorService,
  ) {}

  @Post()
  async check(@Body() createCheckDto: CreateCheckDto) {
    const [workScheduleResponse, workScheduleCheck] = await Promise.all([
      this.workScheduleService.create(createCheckDto),
      this.checkService.check(createCheckDto),
    ]);

    return this.saveErrorService.saveError(
      workScheduleResponse,
      workScheduleCheck,
    );
  }

  @Get()
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.findAllService.findAll(limit,offset);
  }
}
