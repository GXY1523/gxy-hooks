/**
 * title: 存储数组或对象等复杂类型
 * desc: useLocalStorageState 会自动处理序列化和反序列化的操作。
 */

import React from 'react';
import { useLocalStorageState } from 'encodeHooks';

const defaultArray = ['h','e','l','l','o'];

export default function () {
  const [value, setValue] = useLocalStorageState('demo2', {
    defaultValue: defaultArray,
  });

  return (
    <>
      <p>{value?.join('-')}</p>
      <div style={{marginTop: '10px'}}>
        <button
        style={{marginRight: '10px'}}
        onClick={
          () => setValue([...value,Math.random().toString(36).slice(-1)])
        }
        >
          随机生成一个字母，添加至末尾
        </button>
        <button onClick={() => setValue(defaultArray)}>
          重置
        </button>
      </div>
    </>
  );
}
