import { useMemo, useRef } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (this: any, ...args: any[]) => any;
type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

export default function useMemoizedFn<T extends noop>(fun: T) {
  if (isDev) {
    if (!isFunction(fun)) {
      console.error(`useMemoizedFn所需参数为函数类型，但传入的参数类型：${typeof fun}`);
    }
  }
  const fnRef = useRef<T>(fun);
  fnRef.current = useMemo(() => fun, [fun]);
  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memoizedFn.current as T;
}
