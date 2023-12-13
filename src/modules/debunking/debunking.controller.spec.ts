import { Test, TestingModule } from '@nestjs/testing';
import { DebunkingController } from './debunking.controller';
import { DebunkingService } from './debunking.service';

describe('DebunkingController', () => {
  let controller: DebunkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebunkingController],
      providers: [DebunkingService],
    }).compile();

    controller = module.get<DebunkingController>(DebunkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
