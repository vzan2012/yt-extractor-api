import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { UtilsService } from 'src/utils/utils.service';

/**
 * YouTube Module
 *
 * @export
 * @class YoutubeModule
 * @typedef {YoutubeModule}
 */
@Module({
  providers: [YoutubeService, UtilsService],
  controllers: [YoutubeController],
})
export class YoutubeModule {}
