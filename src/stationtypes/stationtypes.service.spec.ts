import { Test, TestingModule } from '@nestjs/testing';
import { StationtypesService } from './stationtypes.service';

describe('StationtypesService', () => {
  let service: StationtypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationtypesService],
    }).compile();

    service = module.get<StationtypesService>(StationtypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
