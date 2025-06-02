import { Module } from '@nestjs/common';
import { WorkShiftService } from './work-shift.service';
import { WorkShiftController } from './work-shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkShift } from './entities/work-shift.entity';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkShift, Employee]),EmployeeModule],
  controllers: [WorkShiftController, EmployeeController],
  providers: [WorkShiftService],
})
export class WorkShiftModule {}
