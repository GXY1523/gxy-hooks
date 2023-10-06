import { renderHook } from '@testing-library/react';
import useDrag from '..';
import type { Options } from '..';
import type { BasicTarget } from '../../utils/domTarget';

const setup = <T>(data: T, target: BasicTarget, options?: Options) => 
renderHook((newData: T) => useDrag(newData ? newData : data, target, options));

const events: Record<string, (event: any) => void> = {};

const mockTarget = {
  addEventListener: jest.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: jest.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
  setAttribute: jest.fn()
};
describe('useDrag', () => {
  it('挂载/卸载 时可以 添加/移除 拖拽事件监听器', () => {
    const {unmount} = setup(1, mockTarget as any)

    // 调用addEventListener方法 
    expect(mockTarget.addEventListener).toBeCalled();
    // addEventListener方法第一次被调用 添加了 dragstart 事件监听器
    expect(mockTarget.addEventListener.mock.calls[0][0]).toBe('dragstart');
    // addEventListener方法第二次被调用 添加了 dragend 事件监听器
    expect(mockTarget.addEventListener.mock.calls[1][0]).toBe('dragend');
    expect(mockTarget.setAttribute).toBeCalledWith('draggable', 'true');
    unmount();
    expect(mockTarget.removeEventListener).toBeCalled();
  })

  it('正确触发 drag 函数', () => {
    const onDragStart = jest.fn();
    const onDragEnd = jest.fn();
    // 模拟事件对象
    const mockEvent = {
      dataTransfer: {
        setData: jest.fn()
      }
    }

    const hook = setup(1, mockTarget as any, {
      onDragStart,
      onDragEnd
    })  
    events.dragstart(mockEvent);
    expect(onDragStart).toBeCalled();

    expect(mockEvent.dataTransfer.setData).toBeCalledWith('custom', '1');

    events.dragend(mockEvent);
    expect(onDragEnd).toBeCalled();

    hook.rerender(2);
    events.dragstart(mockEvent);
    expect(onDragStart).toBeCalled();
    // 最后一次被调用时。 如果该断言通过，则表示在测试中正确设置了数据传输的类型和数据
    expect(mockEvent.dataTransfer.setData).toHaveBeenLastCalledWith('custom','2');
    events.dragend(mockEvent);
    expect(onDragEnd).toBeCalled();
  })

  it('目标元素不支持addEventListener方法', () => {

    // 修改了目标元素的 addEventListener 方法，将其返回值修改为false，
    // 使模拟目标元素不支持该方法
    Object.defineProperty(mockTarget, 'addEventListener', {
      get() {
        return false;
      }
    })

    setup(1, mockTarget as any);
    expect(mockTarget.setAttribute).not.toBeCalled();
  })
})