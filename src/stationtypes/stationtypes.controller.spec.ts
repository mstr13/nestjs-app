import { Test, TestingModule } from '@nestjs/testing';
import { StationtypesController } from './stationtypes.controller';
import { StationtypesService } from './stationtypes.service';

describe('StationtypesController', () => {
  let controller: StationtypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationtypesController],
      providers: [StationtypesService],
    }).compile();

    controller = module.get<StationtypesController>(StationtypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
