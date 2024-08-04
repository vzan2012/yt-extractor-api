import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { UtilsService } from '../utils/utils.service';
import { UtilsModule } from '../utils/utils.module';
import { YoutubeModule } from './youtube.module';

import * as ytdl from '@distube/ytdl-core';
import { YtdlMock } from '../../test/__mocks__/@nestjs/ytdl.mock';
import { fileId, mockInfo } from '../../test/__mocks__/inputs';
import { YouTubeFileFormatObject } from './model';

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;
  let utilsService: UtilsService;
  let ytdlMock: typeof ytdl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtdlMock, UtilsService, YoutubeService],
      imports: [YoutubeModule, UtilsModule],
    }).compile();

    ytdlMock = module.get<typeof ytdl>(ytdl);
    youtubeService = module.get<YoutubeService>(YoutubeService);
    utilsService = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(youtubeService).toBeDefined();
  });

  it('getFileInfo() - To Be Defined', async () => {
    ytdlMock.getInfo = jest.fn().mockResolvedValue(mockInfo);

    await youtubeService.getFileInfoById(fileId);

    expect(await youtubeService.getFileInfoById(fileId)).toBeDefined();
  });

  it('getFileFormatsById() - To Be Defined', async () => {
    ytdlMock.getInfo = jest.fn().mockResolvedValue(mockInfo);

    const { formats } = await ytdlMock.getInfo(fileId);
    const fileFormats = ytdl.filterFormats(formats, 'videoandaudio');

    ytdlMock.filterFormats = jest.fn().mockResolvedValue(fileFormats);

    await youtubeService.getFileFormatsById(fileId, 'videoandaudio');

    expect(
      await youtubeService.getFileFormatsById(fileId, 'videoandaudio'),
    ).toBeDefined();
  });

  it('getFileDetailsToDownload() - To Be Defined', async () => {
    const fileQualityFormatObject: YouTubeFileFormatObject = {
      fileId,
      type: 'videoandaudio',
      quality: 'medium',
      qualityLabel: '360p',
      container: 'mp4',
      itag: 18,
    };
    expect(
      await youtubeService.getFileDetailsToDownload(fileQualityFormatObject),
    ).toBeDefined();
  });
});
