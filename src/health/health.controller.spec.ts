import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  TerminusModule,
} from '@nestjs/terminus';
import { HealthModule } from './health.module';
import { HealthCheckServiceMock } from '../../test/__mocks__/@nestjs/terminus.mock';
import { DiskHealthIndicatorMock } from '../../test/__mocks__/@nestjs/disk.mock';

describe('HealthController', () => {
  let controller: HealthController;
  let healthServiceMock: HealthCheckService;
  let diskHealthIndicatorMock: DiskHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule, HealthModule],
      providers: [
        {
          provide: HealthCheckService,
          useValue: HealthCheckServiceMock,
        },
        {
          provide: DiskHealthIndicator,
          useValue: DiskHealthIndicatorMock,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthServiceMock = module.get<HealthCheckService>(HealthCheckService);
    diskHealthIndicatorMock =
      module.get<DiskHealthIndicator>(DiskHealthIndicator);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call health check', async () => {
    const healthResult: HealthCheckResult = {
      status: 'ok',
      info: {},
      error: {},
      details: {},
    };

    jest.spyOn(healthServiceMock, 'check').mockResolvedValue(healthResult);

    const result = await controller.check();

    expect(result).toEqual(healthResult);

    expect(healthServiceMock.check).toHaveBeenCalled();
  });

  it.skip('should call disk check', () => {
    const storageLabel = 'Disk Health';
    const thresholdUsageObject = {
      thresholdPercent: 0.7,
      path: '/',
    };
    const thresholdSizeObject = {
      threshold: 300 * 1024 * 1024 * 1024,
      path: '/',
    };
  });
});
