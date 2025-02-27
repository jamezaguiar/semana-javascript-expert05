import fs from 'fs';
import prettyBytes from 'pretty-bytes';

export class FileHelper {
  static async getFilesStatus(downloadsFolder) {
    const currentFiles = await fs.promises.readdir(downloadsFolder); // ['file1.txt', 'file2.txt']
    const statuses = await Promise.all(
      currentFiles.map((file) => fs.promises.stat(`${downloadsFolder}/${file}`))
    );

    const filesStatuses = [];

    for (const fileIndex in currentFiles) {
      const { birthtime, size } = statuses[fileIndex];

      filesStatuses.push({
        size: prettyBytes(size),
        file: currentFiles[fileIndex],
        lastModified: birthtime,
        owner: process.env.USER,
      });
    }

    return filesStatuses;
  }
}
