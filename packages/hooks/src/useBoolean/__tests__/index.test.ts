import { renderHook, act } from '@testing-library/react';
import useBoolean from '../index';

// renderHook(() => useBoolean()) 说明它是一个 useBoolean Hook
const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('针对基础功能进行测试', () => {
    const { result } = setUp();
    expect(result.current[0]).toBe(false);
    //通过act动作触发用户行为
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(false);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(true);
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      // @ts-ignore
      result.current[1].set(0);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      // @ts-ignore
      result.current[1].set('a');
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBe(false);
  });

  it('针对有传参的情况进行测试', () => {
    const hook1 = setUp(true);
    expect(hook1.result.current[0]).toBe(true);
    const hook2 = setUp();
    expect(hook2.result.current[0]).toBe(false);
    // @ts-ignore
    const hook3 = setUp(0);
    expect(hook3.result.current[0]).toBe(false);
    // @ts-ignore
    const hook4 = setUp('');
    expect(hook4.result.current[0]).toBe(false);
    // @ts-ignore
    const hook5 = setUp('hello');
    expect(hook5.result.current[0]).toBe(true);
  });
});
