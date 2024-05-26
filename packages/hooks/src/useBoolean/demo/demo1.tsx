/**
 *
 * title: 基础用法
 * desc: 切换 boolean，可以接收默认值。
 */

import React from 'react';
import { useBoolean } from 'gxyHooks';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effect:{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setTrue} style={{ margin: '0 8px' }}>
          Set true
        </button>
        <button type="button" onClick={setFalse}>
          Set false
        </button>
      </p>
    </div>
  );
};
