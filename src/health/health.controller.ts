import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@ApiTags('YT - Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiTags('/')
  @ApiOperation({ summary: 'Get Disk Health' })
  @ApiResponse({
    status: 200,
    description: 'Retrives Disk Health',
  })
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('Disk Health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
      () =>
        this.disk.checkStorage('Disk Health', {
          threshold: 10 * 1024 * 1024 * 1024,
          path: '/',
        }),
    ]);
  }
}
