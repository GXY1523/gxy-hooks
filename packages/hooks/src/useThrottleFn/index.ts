import { useMemo } from 'react';
import { throttle } from 'lodash-es';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';
import type { ThrottleOption } from '../useThrottle/throttleOption';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';

type noop = (...args: any[]) => any;

function useThrottleFn<T extends noop>(fun: T, option?: ThrottleOption) {
  if (isDev) {
    if (!isFunction(fun)) {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fun}`);
    }
  }

  const fnRef = useLatest(fun);

  const wait = option?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        option,
      ),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
