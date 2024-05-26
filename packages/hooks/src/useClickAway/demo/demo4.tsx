/**
 * title: 监听其它事件
 * desc: 通过设置 eventName，可以指定需要监听的事件，试试点击鼠标右键。
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
    'contextmenu',
  );
  return (
    <div>
      <button ref={ref}>button</button>
      <p>num: {num}</p>
    </div>
  );
};
