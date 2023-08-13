import { Provider } from '@nestjs/common';
import * as ytdl from 'ytdl-core';

export const YtdlMock: Provider = {
  provide: ytdl,
  useValue: {
    getInfo: jest.fn(),
    filterFormats: jest.fn(),
  },
};
