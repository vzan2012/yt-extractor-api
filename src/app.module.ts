import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { HealthModule } from './health/health.module';
import { UtilsModule } from './utils/utils.module';

/**
 * App Module
 *
 * @export
 * @class AppModule
 * @typedef {AppModule}
 */
@Module({
  imports: [YoutubeModule, HealthModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
