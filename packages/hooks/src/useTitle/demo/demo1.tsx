/**
 * title: 基础用法
 * desc: 设置页面标题
 */

import React from 'react';
import { useTitle } from 'gxyHooks';

export default () => {
  useTitle('New Title');

  return (
    <div>
      <p>设置页面标题</p>
    </div>
  );
};
