import { act, renderHook } from '@testing-library/react';
import { sleep } from '../../utils/testingHelpers';
import useDebounceFn from '../index';

interface ParamsObj {
  fun: (...arg: any) => any;
  deps?: any[];
  wait: number;
}

let count = 0;
const debounceFn = (gap: number) => {
  count += gap;
};

const setUp = ({ fun, wait }: ParamsObj) => renderHook(() => useDebounceFn(fun, { wait }));

let hook;

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    act(() => {
      hook = setUp({
        fun: debounceFn,
        wait: 200,
      });
    });
    await act(async () => {
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      expect(count).toBe(0);
      await sleep(300);
      expect(count).toBe(2);

      hook.result.current.run(4);
      expect(count).toBe(2);
      await sleep(300);
      expect(count).toBe(6);

      hook.result.current.run(4);
      expect(count).toBe(6);
      hook.result.current.cancel();
      expect(count).toBe(6);
      await sleep(300);
      expect(count).toBe(6);

      hook.result.current.run(1);
      expect(count).toBe(6);
      hook.result.current.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
    });
  });
});
