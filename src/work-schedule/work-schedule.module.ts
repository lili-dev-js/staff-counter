import { Module } from '@nestjs/common';
import { WorkScheduleService } from './work-schedule.service';
import { WorkScheduleController } from './work-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from './work-shift/entities/work-shift.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Employee } from './work-shift/employee/entities/employee.entity';
import { CheckModule } from './check/check.module';
import { Error } from './check/error/entities/error.entity';
import { WorkShiftController } from './work-shift/work-shift.controller';
import { WorkShiftService } from './work-shift/work-shift.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkShift, WorkSchedule, Employee, Error]),
    CheckModule,
  ],
  controllers: [WorkScheduleController, WorkShiftController],
  providers: [WorkScheduleService, WorkShiftService],
})
export class WorkScheduleModule {}
