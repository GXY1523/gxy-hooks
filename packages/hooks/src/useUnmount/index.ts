import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useUnmount = (fun: () => void) => {
  //当前可能是开发环境，可在开发时捕获潜在的错误
  if (isDev && !isFunction(fun))
    console.error(`useUnmount 预期参数为一个函数，但得到了一个 ${typeof fun}`);

  const funRef = useLatest(fun);

  useEffect(() => {
    return () => {
      funRef.current();
    };
  });
};

export default useUnmount;
