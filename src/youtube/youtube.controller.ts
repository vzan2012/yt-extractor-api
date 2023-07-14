import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ytdl, { chooseFormat } from 'ytdl-core';
import { YouTubeFileFormatObject } from './model';
import { Response } from 'express';
import { info } from 'console';

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
   *  Get YouTube File Formats Info By Id
   *
   * @param {string} fileId
   * @param {ytdl.Filter} fileType
   * @returns {Promise<Pick<YouTubeFileFormatObject,'quality' | 'container' | 'qualityLabel' | 'itag'>[]>}
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
  ): Promise<
    Pick<
      YouTubeFileFormatObject,
      'quality' | 'container' | 'qualityLabel' | 'itag'
    >[]
  > {
    try {
      return this.youtubeService.getFileFormatsById(fileId, fileType);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get YouTube File
   *
   * @async
   * @param {Response} response
   * @param {YouTubeFileFormatObject} fileQualityFormatObject
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
    type: YouTubeFileFormatObject,
  })
  async downloadFile(
    @Res() response: Response,
    @Body() fileQualityFormatObject: YouTubeFileFormatObject,
  ) {
    try {
      const {
        youtubeURL,
        fileId,
        fileName,
        fileType,
        container,
        formats,
        quality,
      } = await this.youtubeService.getFileDetailsToDownload(
        fileQualityFormatObject,
      );

      // Set the Response Headers
      response.set({
        'Content-Type': `Content-Type: ${fileType}/${container}`,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      });

      console.log('Download File request controller called');

      // Add the response to the ytdl pipe (to download the file and not to create or store in the server)
      // return ytdl(`${youtubeURL}${fileId}`, {
      //   format: ytdl.chooseFormat(formats, {
      //     quality,
      //   }),
      // })
      //   .on('info', () => {
      //     console.log('Video information:');
      //   })
      //   .pipe(response)
      //   .on('finish', () => {
      //     console.log('File download completed successfully');
      //   })
      //   .on('error', (error) => {
      //     console.error('File download error:', error);
      //   });

      const stream = ytdl(`${youtubeURL}${fileId}`, {
        format: chooseFormat(formats, {
          quality,
        }),
      });

      stream.on('info', () => {
        console.log('Video information Title: ' + info.name);
      });

      stream.pipe(response);

      stream.on('finish', () => {
        console.log('File download completed successfully');
      });

      stream.on('error', (error) => {
        console.error('File download error:', error);
      });
    } catch (error) {
      console.error(error);
      response.status(500).send('Error downloading the file');
    }
  }
}
