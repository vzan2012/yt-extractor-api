import { ApiProperty } from '@nestjs/swagger';
import ytdl from 'ytdl-core';

/**
 * @typedef {ExtendString}
 * @template T
 */
type ExtendString<T extends string> = T | Omit<string, T>;

/**
 * YouTube File Types
 * @export
 * @enum {number}
 */
export enum YouTubeFileTypes {
  AUDIO = 'audio',
  VIDEO = 'video',
  AUDIO_VIDEO = 'audio_and_video',
}

/**
 * YouTubeFileDetailsDownload
 *
 * @export
 * @interface YouTubeFileDetailsDownload
 * @typedef {YouTubeFileDetailsDownload}
 */
export interface YouTubeFileDetailsDownload {
  youtubeURL: string;
  fileId: string;
  fileName: string;
  fileType:
    | 'video'
    | 'videoonly'
    | 'audio'
    | 'audioonly'
    | ((format: ytdl.videoFormat) => boolean);
  container: string;
  formats: ytdl.videoFormat[];
  quality: number;
}

/**
 * YouTube FileFormat Object
 *
 * @export
 * @class YouTubeFileFormatObject
 * @typedef {YouTubeFileFormatObject}
 */
export class YouTubeFileFormatObject {
  @ApiProperty({
    description: 'File Id of Youtube',
    required: true,
    type: String,
    example: 'JzPfMbG1vrE',
  })
  fileId: string;

  @ApiProperty({
    description: 'File type of Youtube (audio, video, videoandaudio)',
    required: true,
    type: String,
    example: 'videoandaudio',
  })
  type: ytdl.Filter;

  @ApiProperty({
    description: 'Quality of the file',
    required: true,
    type: String,
    example: 'medium',
  })
  quality: ytdl.videoFormat | string;

  @ApiProperty({
    description: 'Quality Label of the file',
    required: true,
    type: String,
    example: '360p',
  })
  qualityLabel: ytdl.videoFormat | string;

  @ApiProperty({
    description: 'Container of the file - mp4, webm etc',
    required: true,
    type: String,
    example: 'mp4',
  })
  container: string;

  @ApiProperty({
    description: 'itag number of quality format',
    required: true,
    type: Number,
    example: 18,
  })
  itag: number;
}
