import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import useHover from '../index';

describe('useHover', () => {
  // 模拟鼠标悬停
  it('useHover', () => {
    const { getByText } = render(<button>hover</button>);
    let trigger = 0;
    const { result } = renderHook(() =>
      useHover(getByText('hover'), {
        onEnter: () => {
          trigger++;
        },
        onLeave: () => {
          trigger++;
        },
      }),
    );

    expect(result.current).toBe(false);

    act(() => void fireEvent.mouseEnter(getByText('hover')));
    expect(result.current).toBe(true);
    expect(trigger).toBe(1);

    act(() => void fireEvent.mouseLeave(getByText('hover')));
    expect(result.current).toBe(false);
    expect(trigger).toBe(2);
  })
})