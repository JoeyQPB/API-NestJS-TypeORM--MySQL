import { Injectable } from '@nestjs/common';
import { PathLike } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  getDestinantionPath() {
    return join(__dirname, '../', '../', 'storage', 'photos');
  }

  async uploadFile(file: Express.Multer.File, fileName: string) {
    const path: PathLike = join(this.getDestinantionPath(), fileName);
    await writeFile(path, file.buffer);
    return path;
  }
}
