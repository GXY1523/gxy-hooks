// useMount(fn: () => void);

import { isFunction } from "../utils";
import isDev from "../utils/isDev";
import { useEffect } from 'react';

const useMount = (fn: () => void) => {
  if(isDev){
    if(!isFunction(fn)){
      console.error(`useMount 所需参数为函数类型，但传入的参数类型：${typeof fn}`);
    }
  }
  useEffect(() => {
    fn?.();
  }, [])
  
}

export default useMount;