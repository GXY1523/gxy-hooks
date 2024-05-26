import { renderHook } from '@testing-library/react';
import useLatest from '../index';

const setUp = (value) => renderHook((state) => useLatest(state), { initialProps: value });

describe('useLatest', () => {
  it('针对基础功能进行测试', () => {
    const { result, rerender } = setUp(0);

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);

    rerender(3);
    expect(result.current.current).toBe(3);
  });

  it('reference variable', () => {
    const { result, rerender } = setUp({});

    expect(result.current.current).toEqual({});

    rerender([]);
    expect(result.current.current).toEqual([]);
  });
});
