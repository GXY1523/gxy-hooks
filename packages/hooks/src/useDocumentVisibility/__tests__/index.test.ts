import { renderHook, act } from '@testing-library/react';
import useDocumentVisibility from '..';

const mockIsBrowser = jest.fn(); //记录被调用的次数、参数和返回值等
const mockDocumentVisibilityState = jest.spyOn(document, 'visibilityState', 'get'); //模拟 document.visibilityState 属性的行为

// 模拟 isBrowser 模块的行为
jest.mock('../../utils/isBrowser', () => {
  return {
    __esModule: true,
    get default() {
      return mockIsBrowser();
    },
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('useDocumentVisibility', () => {
  it('不同浏览器状态下', async () => {
    // 当前代码运行在非浏览器环境下，因此无法检测到页面是否被隐藏
    mockDocumentVisibilityState.mockReturnValue('hidden');
    mockIsBrowser.mockReturnValue(false);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toBe('visible');
  });

  it('页面可见性发生变化', async () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');
    mockIsBrowser.mockReturnValue(true);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toBe('hidden');

    mockDocumentVisibilityState.mockReturnValue('visible');
    act(() => {
      // 页面的可见性状态变化
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe('hidden');
  });
});
