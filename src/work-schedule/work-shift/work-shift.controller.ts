import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WorkShiftService } from './work-shift.service';
import { CreateWorkShiftDto } from './dto/create-work-shift.dto';

@Controller('work-shift')
export class WorkShiftController {
  constructor(private readonly workShiftService: WorkShiftService) {}

  @Post()
  create(@Body() createWorkShiftDto: CreateWorkShiftDto) {
    return this.workShiftService.create(createWorkShiftDto);
  }

  @Get()
  findAll() {
    return this.workShiftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workShiftService.findOne(+id);
  }
}
