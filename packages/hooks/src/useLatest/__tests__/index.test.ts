import { renderHook } from '@testing-library/react';
import useLatest from '../index';

const setUp = (val) => renderHook((state) => useLatest(state), { initialProps: val });

describe('useLatest', () => {
  it('使用基本变量', async () => {
    const { result, rerender } = setUp(0);

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);

    rerender(3);
    expect(result.current.current).toBe(3);
  });

  it('使用引用变量', async () => {
    const { result, rerender } = setUp({});

    expect(result.current.current).toEqual({});

    rerender([]);
    expect(result.current.current).toEqual([]);
  });
});
