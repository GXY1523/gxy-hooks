/**
 * title: 基础用法
 * desc: 请点击按钮或按钮外查看效果。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setNum((c) => c + 1);
  }, ref);
  return (
    <div>
      <button ref={ref}>button</button>
      <p>num: {num}</p>
    </div>
  );
};
