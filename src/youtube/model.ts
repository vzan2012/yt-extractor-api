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
 * YouTube FileFormat Object
 *
 * @export
 * @interface YouTubeFileFormatObject
 * @typedef {YouTubeFileFormatObject}
 */
export interface YouTubeFileFormatObject {
  quality: ExtendString<ytdl.VideoFormatQuality>;
  qualityLabel: ytdl.VideoFormatQuality | string;
  container: string;
  itag: number;
}
