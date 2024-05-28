import { act, renderHook } from '@testing-library/react';
import useDefault from '..';

describe('useDefault', () => {
  it('当没有提供值时,应返回默认值', () => {
    const { result } = renderHook(() => useDefault(undefined, 'defaultValue'));
    expect(result.current).toBe('defaultValue');
  });

  it('当提供了值时,应返回提供的值', () => {
    const { result } = renderHook(() => useDefault('providedValue', 'defaultValue'));
    expect(result.current).toBe('providedValue');
  });

  it('当提供的值发生变化时,应更新返回的值', () => {
    const { result, rerender } = renderHook(({ value }) => useDefault(value, 'defaultValue'), {
      initialProps: { value: 'initialValue' },
    });
    expect(result.current).toBe('initialValue');

    act(() => {
      rerender({ value: 'updatedValue' });
    });
    expect(result.current).toBe('updatedValue');
  });
});
