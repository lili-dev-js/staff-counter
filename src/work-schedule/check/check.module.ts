import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from '../work-shift/entities/work-shift.entity';
import { WorkSchedule } from '../entities/work-schedule.entity';
import { Employee } from '../work-shift/employee/entities/employee.entity';
import { CheckController } from './check.controller';
import { WorkScheduleService } from '../work-schedule.service';
import { CheckService } from './check.service';
import { ErrorModule } from './error/error.module';
import { ErrorService } from './error/error.service';
import { Error } from './error/entities/error.entity';
import { FindAllService } from './find-all.service';
import { SaveErrorService } from './save-error.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkShift, WorkSchedule, Employee, Error]),
    ErrorModule,
  ],
  controllers: [CheckController],
  providers: [
    WorkScheduleService,
    CheckService,
    ErrorService,
    FindAllService,
    SaveErrorService,
  ],
})
export class CheckModule {}
