import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { WorkScheduleService } from '../work-schedule.service';
import { ErrorService } from './error/error.service';

@Controller('work-schedule/check')
export class CheckController {
  constructor(
    private readonly checkService: CheckService,
    private readonly workScheduleService: WorkScheduleService,
    private readonly errorService: ErrorService,
  ) {}

  @Post()
  async check(@Body() createCheckDto: CreateCheckDto) {
    const [workScheduleResponse, workScheduleCheck] = await Promise.all([
      this.workScheduleService.create(createCheckDto),
      this.checkService.check(createCheckDto),
    ]);
    const { employees } = workScheduleResponse;

    if (typeof workScheduleCheck !== 'string') {
      const createErrorDto = workScheduleCheck
        .map((error) => {
          const employee = employees.find(
            (employee) =>
              employee.employee_id_number ===
              error?.employee.employee_id_number,
          );
          if (!employee) {
            return;
          }
          return {
            start_first_shift: error?.start_first_shift || 0,
            end_last_shift: error?.end_last_shift || 0,
            error: error?.error || '',
            work_schedule: workScheduleResponse,
            employee,
          };
        })
        .filter((data) => typeof data !== 'undefined');
      await this.errorService.create(createErrorDto);
    }

    return {
      id: workScheduleResponse.id,
      workScheduleCheck,
    };
  }

  @Get()
  findAll() {
    return this.checkService.findAll();
  }
}
