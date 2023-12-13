import { Test, TestingModule } from '@nestjs/testing';
import { DebunkingService } from './debunking.service';

describe('DebunkingService', () => {
  let service: DebunkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebunkingService],
    }).compile();

    service = module.get<DebunkingService>(DebunkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
