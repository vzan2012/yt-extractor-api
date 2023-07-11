import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Body,
  Post,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ytdl from 'ytdl-core';
import { YouTubeFileFormatObject } from './model';

/**
 * Youtube Controller
 * @export
 * @class YoutubeController
 * @typedef {YoutubeController}
 */
@ApiTags('YT API')
@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  /**
   * Get YouTube File Info By Id
   * @param {string} fileId
   * @returns {Promise<Pick<ytdl.MoreVideoDetails,| 'title'| 'author'| 'videoId'| 'thumbnails'| 'description'| 'category'| 'ownerChannelName'>>}
   */
  @Get('/get-file-info')
  @ApiOperation({ summary: 'Get YouTube File Info By Id' })
  @ApiResponse({
    status: 200,
    description: 'Retrives YouTube File Information',
  })
  getFileInfo(
    @Query('id') fileId: string,
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
    try {
      return this.youtubeService.getFileInfoById(fileId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get YouTube File Formats Info By Id
   * @param {string} fileId
   * @param {ytdl.Filter} fileType
   * @returns {Promise<YouTubeFileFormatObject[]>}
   */
  @Get('/get-file-formats-info')
  @ApiOperation({ summary: 'Get YouTube File Formats Info By Id' })
  @ApiResponse({
    status: 200,
    description: 'Retrives YouTube File Formats by Given Id',
  })
  getFileFormats(
    @Query('id')
    fileId: string,
    @Query('fileType') fileType: ytdl.Filter,
  ): Promise<YouTubeFileFormatObject[]> {
    try {
      return this.youtubeService.getFileFormatsById(fileId, fileType);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get YouTube File
   * @param {string} fileId
   * @param {YouTubeFileFormatObject} fileQuality
   * @returns {unknown}
   */
  @Post('/download-file')
  @ApiOperation({ summary: 'Get YouTube File' })
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  @ApiBody({
    schema: {
      type: 'object',
      items: {
        type: 'object',
      },
    },
  })
  downloadFile(
    @Query('id') fileId: string,
    @Body() fileQuality: YouTubeFileFormatObject,
  ) {
    return this.youtubeService.getDownloadFile(fileId, fileQuality);
  }
}
