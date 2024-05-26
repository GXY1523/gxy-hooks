/**
 * title: 使用 option 配置 Cookie
 * desc: 可配置属性：默认值、有效时间、路径、域名、协议、跨域等，详见 Options 文档。
 */

import { useCookieState } from 'gxyHooks';
import React from 'react';

export default function App() {
  const [num, setNum] = useCookieState('useCookieState3', {
    defaultValue: '0',
    path: '/',
    expires: (() => new Date(+new Date() + 2000))(),
  });
  return (
    <>
      <p>{num}</p>
      <p>此时Cookie存储有效期： 2000ms</p>
      <div>
        <button
          style={{ marginRight: 10 }}
          onClick={() => setNum((item) => String(Number(item) + 1))}
        >
          {' '}
          + 1{' '}
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => setNum((item) => String(Number(item) - 1))}
        >
          {' '}
          - 1{' '}
        </button>
        <button onClick={() => setNum('0')}> reset </button>
      </div>
    </>
  );
}
