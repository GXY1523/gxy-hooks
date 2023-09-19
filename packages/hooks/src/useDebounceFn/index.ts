import { debounce } from '../utils/lodash-polyfill';
import { useMemo } from 'react';
import type { DebounceOptions } from '../useDebounce/debounceOptions';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

export default function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn 所需参数为函数类型，但传入的参数类型：${typeof fn}`);
    }
  }
  const fnRef = useLatest(fn)
  // 设置等待时间：
  const wait = options?.wait??1000  //存在 options.wait ，则 wait = options?.wait，否则：wait=1000
  
  // 实现函数防抖效果
  const debounced = useMemo(()=>debounce(
    (...args: Parameters<T>):ReturnType<T> => {
      return fnRef.current(...args)
    },
    wait,
    options
  ),[])

  useUnmount(()=>{
    debounced.cancel()
  })

  return {
    run: debounced, //执行防抖逻辑
    cancel: debounced.cancel,
    flush: debounced.flush  //立即执行函数 并 清除定时器
  }
}