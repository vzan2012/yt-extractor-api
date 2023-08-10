import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { UtilsService } from 'src/utils/utils.service';
import { UtilsModule } from 'src/utils/utils.module';
import { YoutubeModule } from './youtube.module';

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeService, UtilsService],
      imports: [YoutubeModule, UtilsModule],
    }).compile();

    youtubeService = module.get<YoutubeService>(YoutubeService);
  });

  it('should be defined', () => {
    expect(youtubeService).toBeDefined();
  });
});
