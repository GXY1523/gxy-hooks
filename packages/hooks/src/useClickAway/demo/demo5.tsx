/**
 * title: 支持传入多个事件名称
 * desc: 设置了多个事件，你可以试试用鼠标左键或者右键。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useClickAway(
    () => {
      setNum((c) => c + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );
  return (
    <div>
      <button ref={ref}>button</button>
      <p>num: {num}</p>
    </div>
  );
};
