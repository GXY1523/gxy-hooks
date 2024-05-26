import useLatest from '../useLatest';
import { isFunction } from '../utils';
import { useState, useCallback } from 'react';
interface EventTarget<U> {
  target: {
    value: U;
  };
}
export interface Option<T, U> {
  initValue?: T;
  transformer?: (value: U) => T;
}
export default function useEventTarget<T, U = T>(option?: Option<T, U>) {
  const { initValue, transformer } = option || {};
  const [value, setValue] = useState(initValue);
  const transformerRef = useLatest(transformer);

  const reset = useCallback(() => setValue(initValue), []);

  const onChange = useCallback((e: EventTarget<U>) => {
    const _val = e.target.value;
    if (isFunction(transformerRef.current)) {
      return setValue(transformerRef.current(_val));
    }
    // _value 转换成 T 类型 返回
    return setValue(_val as unknown as T);
  }, []);

  return [
    value,
    {
      onChange,
      reset,
    },
  ] as const;
}
