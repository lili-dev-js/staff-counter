import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';
import { WorkShiftModule } from './work-shift/work-shift.module';
import { IsUniqueVariableInObjectsArray } from './validators/isUniqueVariableInObjectsArray';
import { CheckModule } from './work-schedule/check/check.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin1',
      password: 'Zupka765',
      database: 'staff-counter',
      entities: [Employee],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeeModule,
    WorkScheduleModule,
    WorkShiftModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueVariableInObjectsArray],
})
export class AppModule {}
