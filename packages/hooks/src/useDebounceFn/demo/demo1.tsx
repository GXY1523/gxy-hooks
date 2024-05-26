/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会在所有点击完成 2000ms 后执行一次相关函数
 */

import { useDebounceFn } from 'gxyHooks';
import React, { useState } from 'react';

export default () => {
  const [num, setNum] = useState(0);
  const { run } = useDebounceFn(
    () => {
      setNum((n) => n + 1);
    },
    {
      wait: 2000,
    },
  );

  return (
    <div>
      <p>实现防抖效果后：{num}</p>
      <button onClick={run}>快速点击</button>
    </div>
  );
};
