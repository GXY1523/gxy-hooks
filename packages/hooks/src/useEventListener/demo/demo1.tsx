/**
 * title: 基础用法
 * desc: 点击按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { useEventListener } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(0);
  const ref = useRef(null);

  useEventListener(
    'click',
    () => {
      setNum((c) => c + 1);
    },
    {
      target: ref,
    },
  );
  return <button ref={ref}>点击了 {num} 次</button>;
};
