import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinantionPath: jest.fn(),
    uploadFile: jest.fn().mockResolvedValue(''),
  },
};
