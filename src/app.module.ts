import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './work-schedule/work-shift/employee/entities/employee.entity';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';
import { IsUniqueVariableInObjectsArray } from './validators/is-unique-variable-in-objects-array';

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
    WorkScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueVariableInObjectsArray],
})
export class AppModule {}
