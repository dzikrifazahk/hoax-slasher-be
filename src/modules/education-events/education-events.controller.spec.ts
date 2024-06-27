import { Test, TestingModule } from '@nestjs/testing';
import { EducationEventsController } from './controller/education-events.controller';
import { EducationEventsService } from './services/education-events.service';

describe('EducationEventsController', () => {
  let controller: EducationEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationEventsController],
      providers: [EducationEventsService],
    }).compile();

    controller = module.get<EducationEventsController>(EducationEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
