import { Module } from '@nestjs/common';
import { GraphicCheckController } from './graphic-check.controller';

@Module({
  controllers: [GraphicCheckController],
})
export class GraphicCheckModule {}
