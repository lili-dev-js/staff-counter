import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from '../../work-shift/entities/work-shift.entity';
import { WorkSchedule } from '../entities/work-schedule.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { CheckController } from './check.controller';
import { WorkScheduleService } from '../work-schedule.service';
import { CheckService } from './check.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift, WorkSchedule, Employee])],
  controllers: [CheckController],
  providers: [WorkScheduleService, CheckService],
})
export class CheckModule {}
