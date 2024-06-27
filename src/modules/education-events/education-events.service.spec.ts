import { Test, TestingModule } from '@nestjs/testing';
import { EducationEventsService } from './services/education-events.service';

describe('EducationEventsService', () => {
  let service: EducationEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationEventsService],
    }).compile();

    service = module.get<EducationEventsService>(EducationEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
