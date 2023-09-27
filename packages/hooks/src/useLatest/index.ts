import { useRef } from 'react';

export default function useLatest<T>(value: T){
  // useLatest本质上是useRef的使用
  const ref = useRef(value); //useRef可以解决 闭包问题
  ref.current = value;
  return ref;
}
