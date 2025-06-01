import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { ErrorController } from './error.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Error } from './entities/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Error])],
  controllers: [ErrorController],
  providers: [ErrorService],
})
export class ErrorModule {}
