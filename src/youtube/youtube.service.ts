import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { YouTubeFileDetailsDownload, YouTubeFileFormatObject } from './model';
import { UtilsService } from 'src/utils/utils.service';

/**
 * @export
 * @class YoutubeService
 * @typedef {YoutubeService}
 */
@Injectable()
export class YoutubeService {
  /**
   * Creates an instance of UtilsService.
   *
   * @constructor
   * @param {UtilsService} utilsService
   */
  constructor(private utilsService: UtilsService) {}

  youtubeURL = 'https://www.youtube.com/watch?v=';

  /**
   * Returns the youtube file information by given id (Eg: https://www.youtube.com/watch?v=5OOmB_yvljA, where 5OOmB_yvljA is the id )
   *
   * @async
   * @param {string} fileId
   * @returns {Promise<Pick<ytdl.MoreVideoDetails, | 'title'| 'author'| 'videoId'| 'thumbnails'| 'description'| 'category'| 'ownerChannelName'>>}
   */
  async getFileInfoById(
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

  /**
   * Returns the array of YouTube File Formats given by ID and type
   *
   * @async
   * @param {string} fileId
   * @param {ytdl.Filter} type
   * @returns {Promise<Pick<YouTubeFileFormatObject,'quality' | 'container' | 'qualityLabel' | 'itag'>[]>}
   */
  async getFileFormatsById(
    fileId: string,
    type: ytdl.Filter,
  ): Promise<
    Pick<
      YouTubeFileFormatObject,
      'quality' | 'container' | 'qualityLabel' | 'itag'
    >[]
  > {
    const { formats } = await ytdl.getInfo(fileId);

    const fileFormats = ytdl.filterFormats(formats, type);

    const qualityTypes = fileFormats.map((fileFormat) => ({
      quality: fileFormat.quality,
      container: fileFormat.container,
      qualityLabel: fileFormat.qualityLabel,
      itag: fileFormat.itag,
    }));

    return qualityTypes;
  }

  /**
   * Get the YouTube File by given Id and file format
   *
   * @async
   * @param {YouTubeFileFormatObject} fileQualityFormatObject
   * @returns {Promise<YouTubeFileDetailsDownload>}
   */
  async getFileDetailsToDownload(
    fileQualityFormatObject: YouTubeFileFormatObject,
  ): Promise<YouTubeFileDetailsDownload> {
    const { fileId, itag: quality, container, type } = fileQualityFormatObject;
    const {
      videoDetails: { title: fileTitle },
      formats,
    } = await ytdl.getInfo(fileId);

    const updatedFileName = this.utilsService.getUpdatedFileName(
      fileId,
      fileTitle.split(' ')[0],
    );

    const fileName = `${updatedFileName}-${fileQualityFormatObject.quality}.${container}`;

    const fileType =
      type === 'videoandaudio' || type === 'audioandvideo' ? 'video' : type;

    return {
      youtubeURL: this.youtubeURL,
      fileId,
      fileName,
      fileType,
      container,
      formats,
      quality,
    };
  }
}
