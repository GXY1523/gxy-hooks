/**
 * title: useMemoizedFn 函数地址不会变化，可以用于性能优化
 * desc: 示例中 `memoizedFn` 是不会变化的，`callbackFn` 在 count 变化时变化。
 */

import { message } from 'antd';
import { useMemoizedFn } from 'gxyHooks';
import React, { useCallback, useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const callbackFn = useCallback(() => {
    message.info(`使用 useCallback ，当前 count 值：${count}`);
  }, [count]);
  const memoizedFn = useMemoizedFn(() => {
    message.info(`使用 useMemoizedFn ，当前 count 值：${count}`);
  });
  return (
    <>
      <p>count:{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>count + 1</button>
      <p>点击上方按钮，可查看两个不同函数时，子组件渲染次数的差别</p>
      <div style={{ marginTop: 16 }}>
        <h4>1. useMemoizedFn</h4>
        <ExpensiveTree showCount={memoizedFn} />
      </div>
      <div style={{ marginTop: 16 }}>
        <h4>2. useCallback</h4>
        <ExpensiveTree showCount={callbackFn} />
      </div>
    </>
  );
};

const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>子组件渲染次数: {renderCountRef.current}</p>
      <button type="button" onClick={showCount}>
        父组件的count
      </button>
    </div>
  );
});
