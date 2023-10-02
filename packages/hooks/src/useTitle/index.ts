import {useRef, useEffect} from 'react'
import useUnmount from '../useUnmount';
import isBrowser from '../utils/isBrowser';

export interface Options {
  isUnmount?: boolean;
}
const DEFAULT_OPTION: Options={
  isUnmount: false
}

export default function useTitle(title: string, option: Options = DEFAULT_OPTION) {
  const titleRef=useRef(isBrowser ? document.title : '');
  useEffect(() => {
    document.title = title;
  }, [title])

  // 卸载
  useUnmount(() => {
   if(option.isUnmount){
    document.title = titleRef.current
   } 
  })
  
}