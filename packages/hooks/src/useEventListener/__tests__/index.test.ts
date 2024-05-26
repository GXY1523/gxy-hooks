import { renderHook } from '@testing-library/react';
import useEventListener from '..';

describe('useEventListener', () => {
  let continer: HTMLDivElement;

  beforeEach(() => {
    continer = document.createElement('div');
    document.body.append(continer);
  });

  afterEach(() => {
    document.body.removeChild(continer);
  });

  it('点击事件', async () => {
    let state: number = 0;
    const onClick = () => {
      state++;
    };
    const { rerender, unmount } = renderHook(() => {
      useEventListener('click', onClick, { target: () => continer });
    });

    document.body.click();
    expect(state).toBe(0);

    rerender();

    continer.click();
    expect(state).toBe(1);

    unmount();

    document.body.click();
    expect(state).toBe(1);
  });
});
