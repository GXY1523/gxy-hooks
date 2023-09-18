import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

const useUnmount =(fn: ()=>void) => {
  if(isDev){
    if(isFunction(fn)){
      console.error(`useUnmount 所需参数为函数类型，但传入的参数类型：${typeof fn}`);
    }
  }
  const fnRef= useLatest(fn)
  useEffect(
    // 返回一个函数的高阶函数
    ()=>()=>{
      fnRef.current();
  },[]);
};
export default useUnmount;
