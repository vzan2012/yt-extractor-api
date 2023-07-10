import { YouTubeDownloadFileObject, YouTubeFileTypes } from './model';

import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as ytdl from 'ytdl-core';

@Injectable()
export class YoutubeService {
  youtubeURL = 'https://www.youtube.com/watch?v=';
  async getFileInfo(fileId: string): Promise<ytdl.videoInfo> {
    return await ytdl.getInfo(`${this.youtubeURL}${fileId}`);
  }

  // async getDownloadFile(
  //   fileDetails: YouTubeDownloadFileObject,
  //   type: YouTubeFileTypes,
  // ) {}
}
