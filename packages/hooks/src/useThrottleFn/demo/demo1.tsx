/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会每隔 1000ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { useThrottleFn } from 'gxyHooks';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useThrottleFn(
    () => {
      setValue(value + 1);
    },
    { wait: 1000 },
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type="button" onClick={run}>
        快速点击
      </button>
    </div>
  );
};
