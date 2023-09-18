/**
 * title: 基础用法
 * desc: 在组件卸载时，执行函数。
 */

import { useBoolean, useUnmount } from 'encodeHooks';
import { message } from 'antd';
import React from 'react';

const MyComponent=()=>{
  useUnmount(()=>{
    message.info('unmount');
  });
  return (
    <p>useUnmount 的使用</p>
  )
}

export default ()=>{
  const [state,{toggle}] = useBoolean(true)
  return (
    <>
      <button onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent/>}
    </>
  )
}