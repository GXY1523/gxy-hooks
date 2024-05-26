/**
 * title: 支持多个 DOM 对象
 * desc: 支持传入多个目标对象。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useClickAway(() => {
    setNum((c) => c + 1);
  }, [ref1, ref2]);
  return (
    <div>
      <button ref={ref1} style={{ marginRight: '10px' }}>
        button
      </button>
      <button ref={ref2}>button</button>
      <p>num: {num}</p>
    </div>
  );
};
