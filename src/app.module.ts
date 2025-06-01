import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphicCheckModule } from './graphic-check/graphic-check.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';
import { WorkShiftModule } from './work-shift/work-shift.module';
import { IsUniqueVariableInObjectsArray } from './validators/isUniqueVariableInObjectsArray';

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
    GraphicCheckModule,
    EmployeeModule,
    WorkScheduleModule,
    WorkShiftModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueVariableInObjectsArray],
})
export class AppModule {}
