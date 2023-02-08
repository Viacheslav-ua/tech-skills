import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fsPromises from 'fs/promises';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', 'pictures');

      if (this.fileExists(filePath)) {
        await fsPromises.mkdir(filePath, { recursive: true });
      }

      await fsPromises.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (err) {
      throw new HttpException(
        'File writing error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async fileExists(path: string) {
    return !!(await fsPromises.stat(path).catch(() => false));
  }
}
