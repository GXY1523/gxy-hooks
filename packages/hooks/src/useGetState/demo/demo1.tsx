/**
 * title: 打开控制台查看输出
 * desc: 计数器每 3 秒打印一次值
 */

import React, { useEffect } from 'react';
import { useGetState } from 'encodeHooks';

export default () => {
  const [num, setNum, getNum] = useGetState<number>(0)
  useEffect(()=>{
    const interval = setInterval(()=>{
      console.log('固定时间间隔后的结果：', getNum());
      
    },3000)
    return ()=>{
      clearInterval(interval)
    }
  },[])

  return <button onClick={() => setNum(n=>n+1)}>num:{num}</button>
};
