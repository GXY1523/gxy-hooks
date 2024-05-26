/**
 * title: 基础用法
 * desc: ThrottledValue 每隔 1000ms 变化一次。
 */

import React, { useState } from 'react';
import { useThrottle } from 'gxyHooks';

export default () => {
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: 1000 });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="请输入"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
};
