import { renderHook } from '@testing-library/react';
import useUnmount from '../index';

describe('useUnmount', () => {
  it('功能测试', () => {
    const fun = jest.fn();
    const hook = renderHook(() => useUnmount(fun));
    expect(fun).toBeCalledTimes;
    0;

    hook.rerender();
    expect(fun).toBeCalledTimes(0);

    hook.unmount();
    expect(fun).toBeCalledTimes(1);
  });
});
