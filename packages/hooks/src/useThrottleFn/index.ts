import { throttle } from 'lodash-es';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

export default function useThrottleFn<T extends noop>(fn: T,options?: ThrottleOptions) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useThrottleFn 所需参数为函数类型，但传入的参数类型：${typeof fn}`)
    }
  }

  const fnRef = useLatest(fn);
  const wait = options?.wait ?? 1000;
  const throttled = useMemo(
    () => 
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
        
      ),[]
    
  )

  useUnmount(() => {
    throttled.cancel()
  })

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  }
  
}
