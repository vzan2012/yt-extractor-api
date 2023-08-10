import { Injectable } from '@nestjs/common';

/**
 * Utils Service - Helper functions
 *
 * @export
 * @class UtilsService
 * @typedef {UtilsService}
 */
@Injectable()
export class UtilsService {
  /**
   * RegEx - pattern - to check the word is English language or not
   *
   * @type {string}
   */
  regEx = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;

  /**
   * Check the given word is English language or not
   *
   * @param {string} givenWord
   * @returns {string}
   */
  isEnglishLanguage = (givenWord: string) => this.regEx.test(givenWord);

  /**
   * Returns the updated fileName
   *
   * @param {string} fileId
   * @param {string} givenWord
   * @returns {string}
   */
  getUpdatedFileName = (fileId: string, givenWord: string) =>
    this.isEnglishLanguage(givenWord) ? givenWord : fileId;
}
