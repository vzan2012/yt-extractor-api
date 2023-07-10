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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ytdl from 'ytdl-core';

@ApiTags('YT API')
@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

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
      return this.youtubeService.getFileInfo(fileId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/download-file')
  // @ApiOperation({ summary: 'Convert YouTube File' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Convert YouTube File',
  // })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     items: {
  //       type: 'object',
  //     },
  //   },
  // })
  downloadFile(
    // @Body() fileDetails: YouTubeDownloadFileObject,
    // @Query('type') type: YouTubeFileTypes,
    @Query('id') fileId: string,
    @Query('type') type: ytdl.Filter,
  ) {
    return this.youtubeService.getDownloadFile(fileId, type);
    //   try {
    //     const { fileId, itag } = fileDetails;
    //     if (fileId && itag && type) {
    //       // return this.youtubeService.getDownloadFile(fileDetails, type);
    //     } else {
    //       throw new HttpException(
    //         'Check FileDetails Object and type - fields are missing',
    //         HttpStatus.NOT_FOUND,
    //       );
    //     }
    //   } catch (error) {
    //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
  }
}
