import { renderHook, act } from '@testing-library/react';
import useSet from '..';

const setUp = <K>(initialSet?: Iterable<K>) => renderHook(() => useSet(initialSet));

describe('useSet', () => {
  it('初始化', () => {
    const { result } = setUp([1, 2]);
    const [set, utils] = result.current;

    expect(set).toEqual(new Set([1, 2]));
    expect(utils).toStrictEqual({
      add: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('初始化为空', () => {
    const { result } = setUp();
    expect(result.current[0]).toEqual(new Set());

    const { result: result1 } = setUp(undefined);
    expect(result1.current[0]).toEqual(new Set());
  });

  it('一个初始化key', () => {
    const { result } = setUp(['q1']);
    const [set, utils] = result.current;

    let value;
    act(() => {
      value = set.has('q1');
    });

    expect(value).toBe(true);
  });

  it('添加key', () => {
    const { result } = setUp();

    act(() => {
      result.current[1].add('q2');
    });

    let value;
    act(() => {
      value = result.current[0].has('q2');
    });

    expect(value).toBe(true);
  });

  it('key不存在时', () => {
    const { result } = setUp(['q']);
    const [set] = result.current;

    let value;
    act(() => {
      value = set.has('w');
    });

    expect(value).toBe(false);
  });

  it('新增', () => {
    const { result } = setUp(['q']);
    const [, utils] = result.current;

    act(() => {
      utils.add('w');
    });

    expect(result.current[0]).toEqual(new Set(['q', 'w']));
  });

  it('新增的key已经存在时', () => {
    const { result } = setUp(['q']);
    const [, utils] = result.current;

    act(() => {
      utils.add('q');
    });

    expect(result.current[0]).toEqual(new Set(['q']));
  });

  it('remove', () => {
    const { result } = setUp(['q', 'w']);
    const [, utils] = result.current;

    act(() => {
      utils.remove('w');
    });

    expect(result.current[0]).toEqual(new Set(['q']));
  });

  it('要移除的key不存在时', () => {
    const { result } = setUp(['q', 'w']);
    const [, utils] = result.current;

    act(() => {
      utils.remove('e');
    });

    expect(result.current[0]).toEqual(new Set(['q', 'w']));
  });

  it('reset', () => {
    const { result } = setUp(['q']);
    const [, utils] = result.current;

    act(() => {
      utils.add('w');
    });

    expect(result.current[0]).toEqual(new Set(['q', 'w']));

    act(() => {
      utils.reset();
    });

    expect(result.current[0]).toEqual(new Set(['q']));
  });

  it('缓存', () => {
    const { result } = setUp(['q', 'w']);
    const [, utils] = result.current;
    const { add, remove, reset } = utils;

    act(() => {
      add('c');
    });

    expect(result.current[1].add).toBe(add);
    expect(result.current[1].remove).toBe(remove);
    expect(result.current[1].reset).toBe(reset);
  });
});
