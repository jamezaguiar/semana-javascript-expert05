import { describe, test, expect, jest } from '@jest/globals';

import fs from 'fs';

import { Routes } from '../../src/routes.js';

import { FileHelper } from '../../src/FileHelper.js';

describe('#FileHelper suite test', () => {
  describe('#getFilesStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 2057996479,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 844424930677133,
        size: 31890,
        blocks: 64,
        atimeMs: 1630971424372.9812,
        mtimeMs: 1630971235307.384,
        ctimeMs: 1630971235307.384,
        birthtimeMs: 1630971234818.684,
        atime: '2021-09-06T23:37:04.373Z',
        mtime: '2021-09-06T23:33:55.307Z',
        ctime: '2021-09-06T23:33:55.307Z',
        birthtime: '2021-09-06T23:33:54.819Z',
      };

      const MOCK_USER = 'jamezaguiar';
      const FILE_PATH = '/tmp';
      const FILE_NAME = 'file.jpg';

      process.env.USER = MOCK_USER;

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([FILE_NAME]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus(FILE_PATH);

      const expectedResult = [
        {
          size: '31.9 kB',
          lastModified: '2021-09-06T23:33:54.819Z',
          owner: MOCK_USER,
          file: FILE_NAME,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(
        `${FILE_PATH}/${FILE_NAME}`
      );
      expect(result).toMatchObject(expectedResult);
    });
  });
});
