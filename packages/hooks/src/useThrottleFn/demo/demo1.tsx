/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会每隔 2000ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { useThrottleFn } from 'encodeHooks';

export default () => {
  const [num,setNum]=useState(0);
  const {run} = useThrottleFn(
    ()=>{
      setNum(n=>n+1)
    },
    {
      wait: 2000
    }
  )

  return (
    <div>
      <p>实现防抖效果后：{num}</p>
      <button onClick={run}>快速点击！</button>
    </div>
  )
};
