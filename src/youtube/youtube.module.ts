import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { UtilsService } from '../utils/utils.service';
import { UtilsModule } from '../utils/utils.module';

/**
 * YouTube Module
 *
 * @export
 * @class YoutubeModule
 * @typedef {YoutubeModule}
 */
@Module({
  imports: [UtilsModule],
  providers: [YoutubeService, UtilsService],
  controllers: [YoutubeController],
})
export class YoutubeModule {}
