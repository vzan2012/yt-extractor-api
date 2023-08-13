import { Provider } from '@nestjs/common';
import { DiskHealthIndicator } from '@nestjs/terminus';

export const DiskHealthIndicatorMock: Provider = {
  provide: DiskHealthIndicator,
  useValue: {
    create: jest.fn().mockReturnValue({
      checkStorage: jest.fn().mockReturnValue({
        status: 'up',
      }),
    }),
  },
};
