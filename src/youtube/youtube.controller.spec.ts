import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeController } from './youtube.controller';
import { UtilsModule } from '../utils/utils.module';
import { UtilsService } from '../utils/utils.service';
import { YoutubeService } from './youtube.service';

import * as ytdl from 'ytdl-core';
import { YtdlMock } from '../../test/__mocks__/@nestjs/ytdl.mock';
import { fileId, mockInfo } from '../../test/__mocks__/inputs';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('YoutubeController', () => {
  let youtubeController: YoutubeController;
  let youtubeService: YoutubeService;
  let ytdlMock: typeof ytdl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtdlMock, UtilsService, YoutubeService],
      controllers: [YoutubeController],
      imports: [UtilsModule],
    }).compile();

    ytdlMock = module.get<typeof ytdl>(ytdl);
    youtubeController = module.get<YoutubeController>(YoutubeController);
    youtubeService = module.get<YoutubeService>(YoutubeService);
  });

  describe('youtube controller', () => {
    it('youtube controller should be defined', () => {
      expect(youtubeController).toBeDefined();
    });
  });

  describe('getFileInfoById', () => {
    it('should return Promise', () => {
      ytdlMock.getInfo = jest.fn().mockResolvedValue(mockInfo);

      expect(youtubeController.getFileInfo(fileId)).toBeInstanceOf(Promise);
    });
    it('should be throw an exception', async () => {
      const invalidFileId = 'invalidId';
      const errorMessage = `Video id (${invalidFileId}) does not match expected format (/^[a-zA-Z0-9-_]{11}$/)`;

      jest
        .spyOn(ytdlMock, 'getInfo')
        .mockRejectedValue(
          new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
        );

      jest
        .spyOn(youtubeService, 'getFileInfoById')
        .mockRejectedValue(
          new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
        );

      try {
        await youtubeController.getFileInfo(invalidFileId);
        fail('Expecting an exception to throw error');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual(errorMessage);
        expect(error.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('getFileInfoById', () => {
    it('should return Promise', async () => {
      const fileType = 'videoandaudio';
      expect(youtubeController.getFileFormats(fileId, fileType)).toBeInstanceOf(
        Promise,
      );
    });
  });
});
