import { useEffect, useState } from 'react';
import type { ThrottleOption } from './throttleOption';
import useThrottleFn from '../useThrottleFn';

export default function useThrottle<T>(value: T, option?: ThrottleOption) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, option);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}
