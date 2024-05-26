import { act, renderHook } from '@testing-library/react';
import useMap from '..';

const setup = (initialMap?: Iterable<[any, any]>) => renderHook(() => useMap(initialMap));

describe('useMap', () => {
  it('should init map and utils', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [map, utils] = result.current;

    expect(Array.from(map)).toEqual([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    expect(utils).toStrictEqual({
      get: expect.any(Function),
      set: expect.any(Function),
      setNew: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('若未提供初始对象，应初始化一个空map', () => {
    const { result } = setup();
    expect([...result.current[0]]).toEqual([]);

    const { result: result2 } = setup(undefined);
    expect([...result2.current[0]]).toEqual([]);
  });

  it('初始提供的键获取对应的值', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [, utils] = result.current;

    let value;
    act(() => {
      value = utils.get('a');
    });

    expect(value).toBe(1);
  });

  it('获取已提供键的对应值', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);

    act(() => {
      result.current[1].set('a', 99);
    });

    let value;
    act(() => {
      value = result.current[1].get('a');
    });

    expect(value).toBe(99);
  });

  it('should get undefined for non-existing provided key', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [, utils] = result.current;

    let value;
    act(() => {
      value = utils.get('nonExisting');
    });

    expect(value).toBeUndefined();
  });

  it('should set new key-value pair', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [, utils] = result.current;

    act(() => {
      utils.set('newKey', 99);
    });

    expect([...result.current[0]]).toEqual([
      ['foo', 'bar'],
      ['a', 1],
      ['newKey', 99],
    ]);
  });

  it('should override current value if setting existing key', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [, utils] = result.current;

    act(() => {
      utils.set('foo', 'qux');
    });

    expect([...result.current[0]]).toEqual([
      ['foo', 'qux'],
      ['a', 1],
    ]);
  });

  it('设置新map', () => {
    const { result } = setup([
      ['foo', 'bar'],
      ['a', 1],
    ]);
    const [, utils] = result.current;

    act(() => {
      utils.setNew([
        ['foo', 'foo'],
        ['a', 2],
      ]);
    });

    expect([...result.current[0]]).toEqual([
      ['foo', 'foo'],
      ['a', 2],
    ]);

    act(() => {
      // @ts-ignore
      utils.setNew();
    });
    expect([...result.current[0]]).toEqual([]);
  });

  it('移除操作', () => {
    const { result } = setup([['msg', 'hello']]);
    const { remove } = result.current[1];
    expect(result.current[0].size).toBe(1);
    act(() => {
      remove('msg');
    });
    expect(result.current[0].size).toBe(0);

    const { result: result2 } = setup([
      ['foo', 'bar'],
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const [, utils] = result2.current;

    act(() => {
      utils.remove('a');
    });

    expect([...result2.current[0]]).toEqual([
      ['foo', 'bar'],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('重置操作', () => {
    const { result } = setup([['msg', 'hello']]);
    const { set, reset } = result.current[1];
    act(() => {
      set('text', 'new map');
    });
    expect([...result.current[0]]).toEqual([
      ['msg', 'hello'],
      ['text', 'new map'],
    ]);
    act(() => {
      reset();
    });
    expect([...result.current[0]]).toEqual([['msg', 'hello']]);
  });
});
