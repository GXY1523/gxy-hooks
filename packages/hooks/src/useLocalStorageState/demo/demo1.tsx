/**
 * title: 将 state 存储在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import { useLocalStorageState } from 'gxyHooks';
import React from 'react';

export default function () {
  const [inputVal, setInputVal] = useLocalStorageState<string | undefined>('demo1', {
    defaultValue: 'demo111',
  });

  return (
    <>
      <input
        type="text"
        value={inputVal || ''}
        placeholder="请输入"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => setInputVal('demo111')} style={{ marginRight: '16px' }}>
          reset
        </button>
        <button onClick={() => setInputVal(undefined)}>clear</button>
      </div>
    </>
  );
}
