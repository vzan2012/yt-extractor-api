import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('/')
  @ApiOperation({ summary: 'Display Text' })
  @ApiResponse({ status: 200, description: 'Welcome to YT Extractor' })
  getName(): string {
    return this.appService.getName();
  }
}
