/**
 * title: 基础用法
 * desc: 受控的 input，支持 reset。
 */

import { useEventTarget } from 'gxyHooks';
import React from 'react';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({ initValue: '初始值' });

  return (
    <div>
      <input value={value} onChange={onChange} style={{ width: 220, marginRight: '16px' }} />
      <button onClick={reset}>reset</button>
    </div>
  );
};
