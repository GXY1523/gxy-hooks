import { act, renderHook } from '@testing-library/react';
import useResetState from '..';

describe('useResetState', () => {
  const setUp = <S>(initialState: S) =>
    renderHook(() => {
      const [state, setState, resetState] = useResetState<S>(initialState);

      return {
        state,
        setState,
        resetState,
      } as const;
    });

  it('有初始值', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('reset', () => {
    const hook = setUp({
      name: 'qwe',
      job: '',
    });

    act(() => {
      hook.result.current.setState({
        name: 'q',
        job: 't',
      });
    });

    act(() => {
      hook.result.current.resetState();
    });

    expect(hook.result.current.state).toEqual({ name: 'qwe', job: '' });
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
