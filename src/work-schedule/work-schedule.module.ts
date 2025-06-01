import { Module } from '@nestjs/common';
import { WorkScheduleService } from './work-schedule.service';
import { WorkScheduleController } from './work-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from '../work-shift/entities/work-shift.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CheckModule } from './check/check.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkShift, WorkSchedule, Employee]),
    CheckModule
  ],
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService],
})
export class WorkScheduleModule {}
