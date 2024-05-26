/**
 * title: 基础用法
 * desc: 撤销跟重做操作，输入内容后，点击 后退 和 前进 按钮
 */

import React from 'react';
import useHistoryTravel from '..';

export default () => {
  const { value, setValue, backLength, forwardLength, back, forward } = useHistoryTravel<string>();

  return (
    <div>
      <input value={value || ''} onChange={(e) => setValue(e.target.value)} />
      <button disabled={backLength <= 0} onClick={back} style={{ margin: '0 8px' }}>
        后退
      </button>
      <button disabled={forwardLength <= 0} onClick={forward}>
        前进
      </button>
    </div>
  );
};
