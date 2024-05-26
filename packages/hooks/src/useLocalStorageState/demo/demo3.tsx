/**
 * title: 自定义序列化和反序列化函数
 * desc: 对于普通的字符串，可能你不需要默认的 `JSON.stringify/JSON.parse` 来序列化。
 */

import { useLocalStorageState } from 'gxyHooks';
import React from 'react';

export default function () {
  const [inputVal, setInputVal] = useLocalStorageState<string | undefined>('demo3', {
    defaultValue: 'demo333',
    serializer: (v) => v ?? '',
    deserializer: (v) => v,
  });

  return (
    <>
      <input
        type="text"
        value={inputVal || ''}
        placeholder="请输入"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setInputVal('demo111')} style={{ marginRight: '10px' }}>
          reset
        </button>
        <button onClick={() => setInputVal(undefined)}>clear</button>
      </div>
    </>
  );
}
