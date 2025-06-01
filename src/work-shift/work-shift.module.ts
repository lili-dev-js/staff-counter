import { Module } from '@nestjs/common';
import { WorkShiftService } from './work-shift.service';
import { WorkShiftController } from './work-shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from './entities/work-shift.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift, Employee])],
  controllers: [WorkShiftController],
  providers: [WorkShiftService],
})
export class WorkShiftModule {}
