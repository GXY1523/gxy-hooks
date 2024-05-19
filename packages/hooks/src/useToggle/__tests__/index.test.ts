import { renderHook, act } from '@testing-library/react';
import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  it('基础功能测试', () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('功能测试', () => {
    const hook = renderHook(() => useToggle('useToggle'));
    expect(hook.result.current[0]).toBe('useToggle');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();

    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe('useToggle');
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('针对手动切换 Toggle 测试', () => {
    const hook = renderHook(() => useToggle('useToggle', 'Toggle'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('Toggle');

    act(() => {
      hook.result.current[1].set('Toggle');
    });
    expect(hook.result.current[0]).toBe('Toggle');

    callToggle(hook);
    expect(hook.result.current[0]).toBe('useToggle');
  });
});
