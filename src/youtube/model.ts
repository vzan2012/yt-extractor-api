export interface YouTubeFileInfo {
  title: string;
  author: YouTubeFileAuthor;
  lengthSeconds: string;
  viewCount: string;
  likes: string | number | null;
  dislikes: string | number | null;
  thumbnails: YouTubeThumbnails[];
  formats: YouTubeFileFormats[];
  formatsAudio: YouTubeAudioFileFormats[];
  formatsVideo: YouTubeFileFormats[];
}

export interface YouTubeFileAuthor {
  id: string;
  name: string;
  user: string;
  channel_url: string;
  external_channel_url: string;
  user_url: string;
  thumbnails: YouTubeThumbnails[];
  verified: boolean;
  subscriber_count: number;
}

export interface YouTubeThumbnails {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeFileFormats {
  audioBitrate: number;
  approxDurationMs: string;
  container: string;
  hasAudio: boolean;
  hasVideo: boolean;
  itag: number;
  quality: string;
  qualityLabel: string;
}

export interface YouTubeAudioFileFormats extends YouTubeFileFormats {
  audioQuality: string;
}
