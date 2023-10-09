import useMutationObserver from "..";
import { renderHook } from '@testing-library/react';
const options: MutationObserverInit = { attributes: true, childList: true };

describe('useMutationObserver', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  })
  afterEach(() => {
    document.body.removeChild(container);
  })

  it('目标元素样式改变（ style 变化）', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    container.style.backgroundColor = '#efefef';
    await rerender();
    expect(callback).toBeCalled();
  })

  it('目标元素树结构改变', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    const addElement = document.createElement('p');
    container.appendChild(addElement);
    await rerender();
    expect(callback).toBeCalled();
  })

  it('目标元素为null，回调函数不该被调用', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, null, options));
    container.style.backgroundColor = '#efefef';
    await rerender();
    expect(callback).not.toBeCalled();
  })
})