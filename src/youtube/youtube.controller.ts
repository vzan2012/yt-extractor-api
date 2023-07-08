import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YouTubeFileInfo } from './model';
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
}
