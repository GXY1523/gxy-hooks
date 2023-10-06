import { renderHook } from '@testing-library/react';
import useDrop, { Options } from '../index';
import type { BasicTarget } from '../../utils/domTarget';

const setup = (target: unknown, options?:Options) => 
  renderHook(() => useDrop(target as BasicTarget, options));

const events = {};
const moxkTarget = {
  addEventListener: jest.fn((event, callback) => {
    events[event] = callback
  }),
  removeEventListener: jest.fn((event => {
    Reflect.deleteProperty(events, event);
  }))
}

const mockEvent = {
  dataTransfer: {
    getData: (format?: string) => 'mock' as unknown,
    get items() {
      return [] as unknown[];
    },
    get files() {
      return [] as unknown[];
    }
  },
  clipboardData: {
    getData: (format?:string) => 'mock' as unknown,
    get items() {
      return [] as unknown[];
    },
    get files() {
      return [] as unknown[];
    }
  },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn()
}

describe('useDrop', () => {
  it('挂载/卸载 时可以 添加/移除 拖拽事件监听器', () => {
    const {unmount} = setup(moxkTarget);
    const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop', 'paste'];

    expect(moxkTarget.addEventListener).toBeCalledTimes(eventNames.length);

    eventNames.forEach((eventName, i) => {
      // mockTarget对象的addEventListener方法被正确地传入了指定的事件名称
      expect(moxkTarget.addEventListener.mock.calls[i][0]).toBe(eventName);
    })

    unmount();

    expect(moxkTarget.removeEventListener).toBeCalledTimes(eventNames.length);
    eventNames.forEach((eventName, i) => {
      expect(moxkTarget.addEventListener.mock.calls[i][0]).toBe(eventName);
    })
  })

  it('目标元素不支持addEventListener方法', () => {
    const originAddEventListener = moxkTarget.addEventListener;
    Object.defineProperty(moxkTarget, 'addEventListener', {
      value:false
    })
    setup(moxkTarget);
    // 事件对象events中没有任何属性
    expect(Object.keys(events)).toHaveLength(0);

    // 将addEventListener属性恢复为原始的值
    Object.defineProperty(moxkTarget, 'addEventListener', {
      value: originAddEventListener
    })
  })

  it('回调函数被调用', () => {
    const onDragEnter = jest.fn();
    const onDragOver = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    const onPaste = jest.fn();
    setup(moxkTarget, {
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      onPaste
    })

    const callbacks = [onDragEnter, onDragOver, onDragLeave, onDrop, onPaste];
    const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop', 'paste'];
    eventNames.forEach((eventName) => {
      events[eventName](mockEvent)
    })
    callbacks.forEach((callback) => expect(callback).toBeCalled());
  })

  it('onText是否被调用', async () => {
    // 模拟拖放事件，将'drop text'作为文本数据传递给回调函数
    jest.spyOn(mockEvent.dataTransfer, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('drop text');
        }
      }
    ])

    const onText = jest.fn();
    setup(moxkTarget, {
      onText
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('drop text')
  })

  it('onFiles是否被调用', async () => {
    const file = new File(['hooks'], 'hooks.png');
    jest.spyOn(mockEvent.dataTransfer, 'files', 'get').mockReturnValue([file]);

    const onFiles = jest.fn();
    setup(moxkTarget,{
      onFiles
    });

    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onFiles.mock.calls[0][0]).toHaveLength(1);
  })

  it('onUri是否被调用', async () => {
    const uri = 'https://github.com/GXY1523';
    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if(format === 'text/uri-list'){
        return uri
      }
    })
    const onUri = jest.fn();
    setup(moxkTarget, {
      onUri
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onUri.mock.calls[0][0]).toBe(uri);
  })

  it('onDom是否被调用', async () => {
    const data = {
      value: 'mock'
    }
    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if(format === 'custom') return data;
    })

    const onDom = jest.fn();
    setup(moxkTarget, {
      onDom
    })

    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    // toMatchObject 验证这个参数是否包含data对象中的所有属性和属性值
    expect(onDom.mock.calls[0][0]).toMatchObject(data);

    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if(format === 'custom') return {}
    })
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onDom.mock.calls[0][0]).toMatchObject({})
  })

  it('paste是否被调用', async () => {
    jest.spyOn(mockEvent.clipboardData, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('paste text');
        }
      }
    ])

    const onText = jest.fn();
    setup(moxkTarget, {
      onText
    })
    events['dragenter'](mockEvent);
    events['paste'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('paste text')
  })

})