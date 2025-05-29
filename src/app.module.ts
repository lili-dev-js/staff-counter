import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphicCheckModule } from './graphic-check/graphic-check.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
