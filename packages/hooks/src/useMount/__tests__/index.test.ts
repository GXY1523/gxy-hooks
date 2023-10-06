import { renderHook } from '@testing-library/react';
import useMount from '../index';

describe('useMount', () => {
  it('useMount', async () => {
    const fn = jest.fn();
    const hook = renderHook(() => useMount(fn));
    
    // 验证 fn 是否被调用且调用次数为1
    expect(fn).toBeCalledTimes(1);

    hook.rerender();
    expect(fn).toBeCalledTimes(1);

    hook.unmount();
    expect(fn).toBeCalledTimes(1);

    // 渲染一个虚拟组件并在组件卸载时执行 useMount ，最后将组件卸载。
    renderHook(() => useMount(fn)).unmount();
    expect(fn).toBeCalledTimes(2);
  })
})