import { Test, TestingModule } from '@nestjs/testing';
import { GraphicCheckController } from './graphic-check.controller';

describe('GraphicCheckController', () => {
  let controller: GraphicCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphicCheckController],
    }).compile();

    controller = module.get<GraphicCheckController>(GraphicCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
