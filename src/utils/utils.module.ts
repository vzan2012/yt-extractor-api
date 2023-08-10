import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

/**
 * Utils Module
 *
 * @export
 * @class UtilsModule
 * @typedef {UtilsModule}
 */
@Module({
  providers: [UtilsService],
})
export class UtilsModule {}
