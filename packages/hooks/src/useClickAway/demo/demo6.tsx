/**
 * title: 支持 shadow DOM
 * desc: 将 addEventListener 添加到 shadow DOM root
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'gxyHooks';
import root from 'react-shadow';

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
    <root.div>
      <div>
        <button ref={ref}>button</button>
        <p>num: {num}</p>
      </div>
    </root.div>
  );
};
