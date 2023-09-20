import { useEffect, useState } from 'react';
import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from './throttleOptions';

export default function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttle,setThrottle] =useState(value);

  const {run} = useThrottleFn(()=>{
    setThrottle(value)
  },options)

  useEffect(()=>{
    run()
  },[value]);
  return throttle
}
