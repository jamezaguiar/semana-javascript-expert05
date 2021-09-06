import { describe, test, expect } from '@jest/globals';

import { Routes } from '../../src/routes.js';

describe('#Routes suite test', () => {
  describe('#setSocketInstance', () => {
    test('setSocket should store io instance', () => {
      const routes = new Routes();
      const ioObject = {
        to: (id) => ioObject,
        emit: (event, message) => {},
      };

      routes.setSocketInstance(ioObject);
      expect(routes.io).toStrictEqual(ioObject);
    });
  });
});
