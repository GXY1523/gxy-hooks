import { act, renderHook } from '@testing-library/react';
import useGetState from '..';

describe('useGetState', () => {
  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, getState] = useGetState<T>(initialValue);
      return {
        state,
        setState,
        getState,
      } as const;
    });

  it('支持有初始值', () => {
    const hook = setUp(() => 1);
    expect(hook.result.current.state).toBe(1);
  });

  it('支持更新', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(2);
    });
    expect(hook.result.current.state).toBe(2);
  });

  // TODO 改名字
  it('should getState frozen', () => {
    const hook = setUp(0);
    const prevGetState = hook.result.current.getState;

    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState).toBe(prevGetState);
  });
});
