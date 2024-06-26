import { act, renderHook } from '@testing-library/react';
import useRafState from '..';

describe('useRafState', () => {
  it('useRafState', () => {
    const mockRaf = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });

    const { result } = renderHook(() => useRafState(0));
    const setRafState = result.current[1];
    expect(result.current[0]).toBe(1);

    act(() => {
      setRafState(1);
    });
    expect(result.current[0]).toBe(1);
    mockRaf.mockRestore();
  });
});
