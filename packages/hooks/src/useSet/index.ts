import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export default function useSet<K>(initialValue?: Iterable<K>) {
  const getIniVal=() => new Set(initialValue);
  const [setval,setSetval] = useState(getIniVal);

  const add = (key: K) => {
    if(setval.has(key)) {
      return;
    }
    setSetval( set => {
      const temp = new Set(set);
      temp.add(key);
      return temp;
    })
  }

  const reset = () => setSetval(getIniVal())

  const remove = (key: K) => {
    if(!setval.has(key)) return;
    setSetval(set => {
      const temp = new Set(set);
      temp.delete(key);
      return temp;
    })
  }

  return [
    setval,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset)
    }
  ] as const;
}