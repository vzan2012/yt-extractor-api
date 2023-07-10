import { YouTubeDownloadFileObject, YouTubeFileTypes } from './model';

import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as ytdl from 'ytdl-core';

@Injectable()
export class YoutubeService {
  youtubeURL = 'https://www.youtube.com/watch?v=';
  async getFileInfo(
    fileId: string,
  ): Promise<
    Pick<
      ytdl.MoreVideoDetails,
      | 'title'
      | 'author'
      | 'videoId'
      | 'thumbnails'
      | 'description'
      | 'category'
      | 'ownerChannelName'
    >
  > {
    const {
      videoDetails: {
        title,
        description,
        category,
        ownerChannelName,
        videoId,
        author,
        thumbnails,
      },
    } = await ytdl.getInfo(`${this.youtubeURL}${fileId}`);
    return {
      title,
      description,
      category,
      ownerChannelName,
      videoId,
      author,
      thumbnails,
    };
  }

  async getDownloadFile(fileId: string, type: ytdl.Filter) {
    const { formats } = await ytdl.getInfo(fileId);

    const fileFormats = ytdl.filterFormats(formats, type);

    const qualityTypes = fileFormats.map((fileFormat) => ({
      quality: fileFormat.quality,
      qualityLabel: fileFormat.qualityLabel,
      itag: fileFormat.itag,
    }));

    ytdl(`${this.youtubeURL}${fileId}`, {
      format: ytdl.chooseFormat(formats, {
        quality: '18',
      }),
    }).pipe(createWriteStream('video.mp4'));

    console.log(qualityTypes);

    return fileFormats;
  }
}
