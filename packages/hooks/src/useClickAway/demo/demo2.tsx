/**
 * title: 支持传入 DOM
 * desc: 支持直接传入 DOM 对象或 function。
 */

import React, { useState } from 'react';
import { useClickAway } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(0);

  useClickAway(
    () => {
      setNum((c) => c + 1);
    },
    () => document.getElementById('clickButton'),
  );
  return (
    <div>
      <button id="clickButton">button</button>
      <p>num: {num}</p>
    </div>
  );
};
