import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import {
  YouTubeDownloadFileObject,
  YouTubeFileInfo,
  YouTubeFileTypes,
} from './model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('YouTube API')
@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('/get-file-info')
  @ApiOperation({ summary: 'Get YouTube File Info By Id' })
  @ApiResponse({
    status: 200,
    description: 'Retrives YouTube File Information',
  })
  getFileInfo(@Query('id') fileId: string): YouTubeFileInfo {
    try {
      return this.youtubeService.getFileInfo(fileId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/download-file')
  @ApiOperation({ summary: 'Get YouTube File Info By Id' })
  @ApiResponse({
    status: 200,
    description: 'Retrives YouTube File Information',
  })
  downloadFile(
    @Body() fileDetails: YouTubeDownloadFileObject,
    @Query('type') type: YouTubeFileTypes,
  ) {
    try {
      const { fileId, itag } = fileDetails;
      if (fileId && itag && type) {
        return this.youtubeService.getDownloadFile(fileDetails, type);
      } else {
        throw new HttpException(
          'Check FileDetails Object and type - fields are missing',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
