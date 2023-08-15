import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { YoutubeModule } from './../src/youtube/youtube.module';
import { fileId } from './__mocks__/inputs';

describe('YoutubeController (e2e)', () => {
  let youtube: INestApplication;

  const invalidFileId = 'invalid';
  const fileType = 'videoandaudio';
  const downloadFileParameters = {
    fileId,
    type: 'videoandaudio',
    quality: 'medium',
    qualityLabel: '360p',
    container: 'mp4',
    itag: 18,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [YoutubeModule],
    }).compile();

    youtube = moduleFixture.createNestApplication();
    await youtube.init();
  });

  it(`/youtube/get-file-info?id=${fileId} (GET) - Status ${HttpStatus.OK}`, () => {
    return request(youtube.getHttpServer())
      .get(`/youtube/get-file-info?id=${fileId}`)
      .expect(HttpStatus.OK);
  });

  it(`/youtube/get-file-info?id=${invalidFileId} (GET) - Status ${HttpStatus.INTERNAL_SERVER_ERROR}`, () => {
    return request(youtube.getHttpServer())
      .get(`/youtube/get-file-info?id=${invalidFileId}`)
      .expect({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
  });

  it(`/youtube/get-file-formats-info?id=${fileId}&fileType=${fileType} (GET) - Status ${HttpStatus.OK}`, () => {
    return request(youtube.getHttpServer())
      .get(`/youtube/get-file-formats-info?id=${fileId}&fileType=${fileType}`)
      .expect(HttpStatus.OK);
  });

  it(`/youtube/get-file-formats-info?id=${invalidFileId}&fileType=${fileType} (GET) - Status ${HttpStatus.INTERNAL_SERVER_ERROR}`, () => {
    return request(youtube.getHttpServer())
      .get(
        `/youtube/get-file-formats-info?id=${invalidFileId}&fileType=${fileType}`,
      )
      .expect({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
  });

  it(`/youtube/download-file (POST) - Status ${HttpStatus.CREATED}`, () => {
    return request(youtube.getHttpServer())
      .post(`/youtube/download-file`)
      .send(downloadFileParameters)
      .expect(HttpStatus.CREATED);
  });

  it(`/youtube/download-file (POST) - Status ${HttpStatus.INTERNAL_SERVER_ERROR}`, () => {
    return request(youtube.getHttpServer())
      .post(`/youtube/download-file`)
      .send({ ...downloadFileParameters, fileId: invalidFileId })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
