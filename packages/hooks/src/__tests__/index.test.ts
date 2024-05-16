import * as gxyHooks from '..';

describe('gxyHooks', () => {
  test('exports modules should be defined', () => {
    Object.keys(gxyHooks).forEach((module) => {
      expect(gxyHooks[module]).toBeDefined();
    });
  });
});
