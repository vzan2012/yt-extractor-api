import { Provider } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

export const HealthCheckServiceMock: Provider = {
  provide: HealthCheckService,
  useValue: {
    create: jest.fn().mockReturnValue({
      check: jest.fn(),
    }),
  },
};
