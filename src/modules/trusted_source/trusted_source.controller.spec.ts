import { Test, TestingModule } from '@nestjs/testing';
import { TrustedSourceController } from './trusted_source.controller';
import { TrustedSourceService } from './trusted_source.service';

describe('TrustedSourceController', () => {
  let controller: TrustedSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrustedSourceController],
      providers: [TrustedSourceService],
    }).compile();

    controller = module.get<TrustedSourceController>(TrustedSourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
