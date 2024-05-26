import { useEffect, useState } from 'react';
import useDebounceFn from '../useDebounceFn';
import type { DebounceOption } from './debounceOption';

export default function useDebounce<T>(value: T, option?: DebounceOption) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, option);

  useEffect(() => {
    run();
  }, [value]);
  return debounced;
}
