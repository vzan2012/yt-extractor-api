import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { UtilsService } from 'src/utils/utils.service';
import { UtilsModule } from 'src/utils/utils.module';

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
