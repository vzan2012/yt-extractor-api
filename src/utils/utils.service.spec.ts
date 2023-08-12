import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { UtilsModule } from './utils.module';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  const englishWord = 'fileNameString';
  const fileId = 'lqHq6_SM-0c';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [UtilsService],
    }).compile();

    utilsService = module.get<UtilsService>(UtilsService);
  });

  it('isEnglishLanguage() - to Be Defined', () => {
    expect(utilsService).toBeDefined();
  });

  it('isEnglishLanguage() - returns boolean true', () => {
    expect(utilsService.isEnglishLanguage(englishWord)).toBeTruthy();
  });

  it('getUpdatedFileName() - to Be Defined', () => {
    expect(utilsService.getUpdatedFileName(fileId, englishWord)).toBeDefined();
  });
});
