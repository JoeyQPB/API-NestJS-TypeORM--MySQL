import { Test, TestingModule } from '@nestjs/testing';
import { getPhoto } from '../testing/get-photo.mock';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('teste do File Service', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const filename = 'photo-fake-test.png';
      fileService.uploadFile(photo, filename);
    });
  });
});
