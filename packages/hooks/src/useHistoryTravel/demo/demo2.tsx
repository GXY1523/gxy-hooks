/**
 * title: 限制历史记录最大长度
 * desc: 限制最大历史记录数量,避免过度占用内存。
 */

import React from 'react';
import useHistoryTravel from '..';

export default () => {
  const maxLength = 3;
  const { value, setValue, backLength, forwardLength, back, forward } = useHistoryTravel<string>(
    '',
    maxLength,
  );

  return (
    <div>
      <div>maxLength: {maxLength}</div>
      <div>backLength: {backLength}</div>
      <div>forwardLength: {forwardLength}</div>
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
