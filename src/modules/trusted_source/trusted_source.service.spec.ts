import { Test, TestingModule } from '@nestjs/testing';
import { TrustedSourceService } from './trusted_source.service';

describe('TrustedSourceService', () => {
  let service: TrustedSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrustedSourceService],
    }).compile();

    service = module.get<TrustedSourceService>(TrustedSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
