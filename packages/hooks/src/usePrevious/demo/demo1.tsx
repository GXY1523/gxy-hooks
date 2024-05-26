/**
 * title: 基础用法
 * desc: 记录上次的 num 值
 */

import { usePrevious } from 'gxyHooks';
import React, { useState } from 'react';

export default () => {
  const [num, setNum] = useState(0);
  const pre = usePrevious(num);
  return (
    <>
      <p>当前值 {num}</p>
      <p>之前的值： {pre}</p>
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => setNum((c) => c + 1)} style={{ marginRight: '16px' }}>
          {' '}
          + 1{' '}
        </button>
        <button onClick={() => setNum((c) => c - 1)}> - 1 </button>
      </div>
    </>
  );
};
