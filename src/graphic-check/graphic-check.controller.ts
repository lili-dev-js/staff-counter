import { Controller, Post } from '@nestjs/common';

@Controller('graphic-check')
export class GraphicCheckController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
