import { renderHook, act } from '@testing-library/react';
import useTitle from '../index';

describe('useTitle', () => {
  it('可替换页面标题', () => {
    const hook = renderHook((props) => useTitle(props), { initialProps: 'page title' });
    expect(document.title).toBe('page title')
    act(() => {
      hook.rerender('update Title')
    })
    expect(document.title).toBe('update Title')
  })

  it('卸载时恢复原标题', () => {
    document.title = 'page title';
    const hook = renderHook((props) => useTitle(props, { isUnmount: true }), {
      initialProps: 'new page title'
    });
    expect(document.title).toBe('new page title');
    hook.unmount();
    expect(document.title).toBe('page title')

  })

  it('卸载时不恢复原标题', () => {
    document.title = 'page title';
    const hook = renderHook((props) => useTitle(props, { isUnmount: false }), {
      initialProps: 'new page title'
    });
    expect(document.title).toBe('new page title');
    hook.unmount();
    expect(document.title).toBe('new page title')
  })
})