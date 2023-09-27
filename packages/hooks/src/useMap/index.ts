import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export default function useMap<K, V> (initialVal?: Iterable<readonly [K, V]>) {
  const getInitialVal = () => new Map(initialVal);
  const [map, setMap] = useState<Map<K, V>>(getInitialVal)

  // 添加
  const set = (key: K, val: V) => {
    setMap((prev) => {
      const temp = new Map(prev)
      temp.set(key, val)
      return temp
    })
  }

  // 新生成一个map
  const setNew = (newMap: Iterable<readonly [K,V]>) => {
    setMap(new Map(newMap))
  }

  // 移除
  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev)
      temp.delete(key)
      return temp
    })
  }

  const reset = () => setMap(getInitialVal())

  const get = (key: K) => map.get(key)

  return [
    map,
    {
      set:useMemoizedFn(set),
      setNew:useMemoizedFn(setNew),
      remove:useMemoizedFn(remove),
      reset:useMemoizedFn(reset),
      get:useMemoizedFn(get),
    }
  ] as const
}
