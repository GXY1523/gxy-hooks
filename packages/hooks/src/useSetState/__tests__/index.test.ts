import { act, renderHook } from '@testing-library/react';
import useSetState from '../index';

describe('useSetState', () => {
  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setState] = useSetState<T>(initialValue);
      return {
        state,
        setState,
      } as const;
    });

  it('支持 initialValue', () => {
    const hook = setUp({
      head: 'hello',
    });
    expect(hook.result.current.state).toEqual({ head: 'hello' });
  });

  it('支持 object', () => {
    const hook = setUp<any>({
      head: 'hello',
    });
    act(() => {
      hook.result.current.setState({ content: 'world' });
    });
    expect(hook.result.current.state).toEqual({ head: 'hello', content: 'world' });
  });

  it('支持函数更新', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setState((prev) => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });
});
