import { act, renderHook } from '@testing-library/react';
import useTitle from '../index';

describe('useTitle', () => {
  it('更新标题', () => {
    const hook = renderHook((prop) => useTitle(prop), { initialProps: 'Old Title' });

    expect(document.title).toBe('Old Title');

    act(() => {
      hook.rerender('Next Title');
    });
    expect(document.title).toBe('Next Title');
  });

  it('unmount时重置标题', () => {
    document.title = 'Old Title';

    const hook = renderHook((prop) => useTitle(prop, { restorePreviousTitle: true }), {
      initialProps: 'Next Title',
    });
    expect(document.title).toBe('Next Title');

    hook.unmount();
    expect(document.title).toBe('Old Title');
  });

  it('unmount时不重置标题', () => {
    document.title = 'Old Title';

    const hook = renderHook((prop) => useTitle(prop, { restorePreviousTitle: false }), {
      initialProps: 'Next Title',
    });
    expect(document.title).toBe('Next Title');

    hook.unmount();
    expect(document.title).toBe('Next Title');
  });
});
