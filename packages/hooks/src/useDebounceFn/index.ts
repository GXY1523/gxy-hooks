import { useMemo } from 'react';
import { DebounceOption } from '../useDebounce/debounceOption';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';
import { debounce } from '../utils/lodash-polyfill';
import useUnmount from '../useUnmount';

type noop = (...args: any[]) => any;

export default function useDebounceFn<T extends noop>(fun: T, option?: DebounceOption) {
  if (isDev) {
    if (!isFunction(fun)) {
      console.error(`useDebounceFn 期望参数是一个函数, 但得到了 ${typeof fun}`);
    }
  }

  const funRef = useLatest(fun);

  // 设置等待时间：
  const wait = option?.wait ?? 1000; // 存在 options.wait ，则 wait = options?.wait，否则：wait=1000

  // 实现函数防抖效果
  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return funRef.current(...args);
        },
        wait,
        option,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced, //执行防抖逻辑
    cancel: debounced.cancel,
    flush: debounced.flush, //立即执行函数 并 清除定时器
  };
}
