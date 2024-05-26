/**
 * title: 基础用法
 * desc: 组件卸载时，执行函数。
 */

import React from 'react';
import { message } from 'antd';
import { useBoolean, useUnmount } from 'gxyHooks';

const XyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <p>xyHooks</p>;
};

export default () => {
  const [state, { toggle }] = useBoolean(true);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>

      {state && <XyComponent />}
    </>
  );
};
