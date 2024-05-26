/**
 * title: 将 state 存储在 Cookie 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 Cookie 中恢复了。
 */

import { useCookieState } from 'gxyHooks';
import React from 'react';

export default () => {
  const [message, setMessage] = useCookieState('useCookieState1');
  return (
    <input
      placeholder="请输入任意值"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: '30%' }}
    />
  );
};
