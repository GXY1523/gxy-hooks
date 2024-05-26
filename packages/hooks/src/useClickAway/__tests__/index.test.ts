import { renderHook } from '@testing-library/react';
import useClickAway from '..';

describe('useClickAway', () => {
  let continer: HTMLDivElement;
  let continer1: HTMLDivElement;

  beforeEach(() => {
    continer = document.createElement('div');
    continer1 = document.createElement('div');

    continer1.setAttribute('id', 'box1');

    document.body.appendChild(continer);
    document.body.appendChild(continer1);
  });

  afterEach(() => {
    document.body.removeChild(continer);
    document.body.removeChild(continer1);
  });

  it('DOM', async () => {
    let state: number = 0;
    const { rerender, unmount } = renderHook((dom: any) => {
      useClickAway(() => {
        state++;
      }, dom);
    });

    rerender(continer);
    continer.click();
    expect(state).toBe(0);

    document.body.click();
    expect(state).toBe(1);

    rerender(continer1);
    continer1.click();
    expect(state).toBe(1);

    document.body.click();
    expect(state).toBe(2);
  });

  it('多目标', async () => {
    let state: number = 0;

    const { rerender, unmount } = renderHook((dom: any) => {
      useClickAway(() => {
        state++;
      }, dom);
    });

    rerender([continer, continer1]);
    continer.click();
    expect(state).toBe(0);

    continer1.click();
    expect(state).toBe(0);

    document.body.click();
    expect(state).toBe(1);

    unmount();

    document.body.click();
    expect(state).toBe(1);
  });
});
