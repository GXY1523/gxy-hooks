import { renderHook, act } from '@testing-library/react';
import useEventTarget from '..';

describe('useEventTarget', () => {
  it('无初始值', async () => {
    const hook = renderHook(() => useEventTarget());
    expect(hook.result.current[0]).toBeUndefined();
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'qwe' } });
    });
    expect(hook.result.current[0]).toBe('qwe');
  });

  it('有初始值', async () => {
    const hook = renderHook(() => useEventTarget({ initValue: 'qwe' }));
    expect(hook.result.current[0]).toBe('qwe');

    act(() => {
      hook.result.current[1].onChange({ target: { value: 'asd' } });
    });
    expect(hook.result.current[0]).toBe('asd');

    act(() => {
      hook.result.current[1].reset();
    });
    expect(hook.result.current[0]).toBe('qwe');
  });

  it('存在 transformer', async () => {
    const hook = renderHook(() =>
      useEventTarget({ transformer: (str: string) => str.toUpperCase() }),
    );
    expect(hook.result.current[0]).toBeUndefined();

    act(() => {
      hook.result.current[1].onChange({ target: { value: 'qwe' } });
    });
    expect(hook.result.current[0]).toBe('QWE');
  });

  it('可对输入进行类型转换', async () => {
    const hook = renderHook(() =>
      useEventTarget<string, number>({ transformer: (num: number) => String(num) }),
    );
    expect(hook.result.current[0]).toBeUndefined();

    act(() => {
      hook.result.current[1].onChange({ target: { value: 123 } });
    });
    expect(hook.result.current[0]).toBe('123');
  });
});
