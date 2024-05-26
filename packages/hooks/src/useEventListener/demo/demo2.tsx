/**
 * title: 监听 keydown 事件
 * desc: 按下键盘查看效果。
 */

import React, { useState, useRef } from 'react';
import { useEventListener } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState('');
  const ref = useRef(null);

  useEventListener('keydown', (ev) => {
    setNum(ev.code);
  });
  return <p>按下的键为： {num}</p>;
};
