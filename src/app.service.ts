import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns the Application Name
   *
   * @returns {string}
   */
  getName(): string {
    return 'YT Extractor';
  }
}
