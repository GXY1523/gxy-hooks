/**
 * title: 基础用法
 * desc: ThrottledValue 每隔 800ms 变化一次。
 */

import React, { useState } from 'react';
import { useThrottle } from 'encodeHooks';

export default () => {
  const [val,setVal] = useState<string>();
  const ThrottleValue = useThrottle(val,{wait: 800});

  return (
    <div>
      <input 
        type="text" 
        value={val}
        placeholder='请输入'
        onChange={e => setVal(e.target.value)}
        style={{width: 200}}
      />
      <p>
        输入框内的值：{ThrottleValue}
      </p>
    </div>    
  )
};
