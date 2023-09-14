import {useMemo,useRef} from 'react'
import { isFunction } from '../utils'
import isDev from '../utils/isDev'

type noop=(this:any,...args:any[])=>any
type PickFunction<T extends noop>=(this:ThisParameterType<T>,...args:Parameters<T>)=>ReturnType<T>

export default function useMemoizedFn<T extends noop>(fn:T){
  if(isDev){
    if(!isFunction(fn)){
      console.log(`useMemoizedFn所需参数为函数类型，但传入的参数类型：${typeof fn}`);
      
    }
  }
  const fnRef=useRef<T>(fn)
  fnRef.current=useMemo(()=>fn,[fn])
  const memoizedFn=useRef<PickFunction<T>>()
  if(!memoizedFn.current){
    memoizedFn.current=function(this,...args){
      return fnRef.current.apply(this,args)
    }
  }
  return memoizedFn.current as T
}
