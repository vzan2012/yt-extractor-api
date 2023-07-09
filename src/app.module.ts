import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [YoutubeModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
