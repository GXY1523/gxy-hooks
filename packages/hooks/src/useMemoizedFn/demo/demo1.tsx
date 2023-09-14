/**
 * title: 基础用法
 * desc: useMemoizedFn 与 useCallback 可以实现同样的效果。
 */

import React, { useState, useCallback } from 'react';
import { message } from 'antd';
import { useMemoizedFn } from 'encodeHooks';

export default () => {
  const [count,setCount]=useState(0)
  const callbackFn=useCallback(()=>{
    message.info(`使用 useCallback ，当前 count 值：${count}`)
  },[count])
  const memoizedFn=useMemoizedFn(()=>{
    message.info(`使用 useMemoizedFn ，当前 count 值：${count}`)
  })
  return(
    <>
    <p>count:{count}</p>
    <button onClick={()=>setCount(c=>c+1)}>
      count + 1
    </button>
    <div style={{marginTop:10}}>
      <button onClick={memoizedFn} style={{marginRight:10}}>useMemoizedFn</button>
      <button onClick={callbackFn}>useCallback</button>
    </div>
    </>
  )
};
