import { YouTubeFileInfo } from './model';

import { Injectable } from '@nestjs/common';
import * as yt from 'yt-converter';

@Injectable()
export class YoutubeService {
  getFileInfo(fileId: string): YouTubeFileInfo {
    return yt.getInfo(`https://www.youtube.com/watch?v=${fileId}`);
  }
}
