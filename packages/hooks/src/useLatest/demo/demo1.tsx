/**
 * title: 基础用法
 * desc: useLatest 返回的永远是最新值
 */

import React, { useState, useEffect } from 'react';
import { useLatest } from 'encodeHooks';

export default () => {
  const [num,setNum] = useState(0)
  const latestNumRef=useLatest(num)
  useEffect(()=>{
    const interval=setInterval(()=>{
      // 此处num是闭包（因为得到的num是函数作用域外面的），是外部num的初始值0
      // console.log(num);
      console.log(latestNumRef.current);  //此时结果会更新
      
      // 返回的是 setState 的值
      // setNum(cur=>cur+1)

      setNum(latestNumRef.current+1)  
    },1000)
    return ()=> clearInterval(interval)
  },[])

  return (
    <>
      <p>num: {num}</p>
    </>
  )
}
