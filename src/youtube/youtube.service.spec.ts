import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { UtilsService } from '../utils/utils.service';
import { UtilsModule } from '../utils/utils.module';
import { YoutubeModule } from './youtube.module';

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService, YoutubeService],
      imports: [YoutubeModule, UtilsModule],
    }).compile();

    youtubeService = module.get<YoutubeService>(YoutubeService);
    utilsService = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(youtubeService).toBeDefined();
  });
});
