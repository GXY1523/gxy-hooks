/**
 * title: 基础用法
 * desc: 记录上次的 num 值
 */

import { usePrevious } from 'encodeHooks';
import React, { useState } from 'react';

export default () => {
  const [num,setNum] = useState(0);
  const pre=usePrevious(num);
  return (
    <>
    <p>current value： {num}</p>
    <p>previous value： {pre}</p>
    <div style={{marginTop:'10px'}}>
      <button onClick={() => setNum(c => c+1)} style={{marginRight:'10px'}}> + 1 </button>
      <button onClick={() => setNum(c => c-1)}> - 1 </button>
    </div>
    </>
  )
};
