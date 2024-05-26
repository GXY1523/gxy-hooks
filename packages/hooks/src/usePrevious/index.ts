import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (pre: T | undefined, next: T) => boolean;
// 返回 两个参数不相等的布尔值
const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);
export default function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
): T | undefined {
  const preRef = useRef<T>();
  const curRef = useRef<T>();
  // 俩值不相等 返回 true
  if (shouldUpdate(curRef.current, state)) {
    preRef.current = curRef.current;
    curRef.current = state;
  }
  return preRef.current;
}
