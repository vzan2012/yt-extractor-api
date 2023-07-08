import {
  YouTubeFileInfo,
  YouTubeDownloadFileObject,
  YouTubeFileTypes,
} from './model';

import { Injectable } from '@nestjs/common';
import * as yt from 'yt-converter';

@Injectable()
export class YoutubeService {
  youtubeURL = 'https://www.youtube.com/watch?v=';
  getFileInfo(fileId: string): YouTubeFileInfo {
    return yt.getInfo(`${this.youtubeURL}${fileId}`);
  }

  async getDownloadFile(
    fileDetails: YouTubeDownloadFileObject,
    type: YouTubeFileTypes,
  ) {
    const { fileId, itag, title } = fileDetails;
    const fileObject = {
      url: `https://www.youtube.com/watch?v=${fileId}`,
      itag,
      path: './Downloads',
      directoryDownload: './Downloads',
      title,
    };
    if (type === YouTubeFileTypes.AUDIO) {
      return yt.convertAudio(
        fileObject,
        (onData) => onData,
        (onClose) => onClose,
      );
    }
    if (type === YouTubeFileTypes.VIDEO) {
      return yt.convertVideo(
        fileObject,
        (onData) => onData,
        (onClose) => onClose,
      );
    }
  }
}
