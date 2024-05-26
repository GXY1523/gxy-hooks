/**
 * title: 基础用法
 * desc: DebouncedValue 只会在输入结束 800ms 后变化。
 */

import React, { useState } from 'react';
import { useDebounce } from 'gxyHooks';

export default () => {
  const [val, setVal] = useState<string>();
  const DebouncedValue = useDebounce(val, { wait: 800 });

  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="请输入"
        onChange={(e) => setVal(e.target.value)}
        style={{ width: 200 }}
      />
      <p>输入框内的值：{DebouncedValue}</p>
    </div>
  );
};
