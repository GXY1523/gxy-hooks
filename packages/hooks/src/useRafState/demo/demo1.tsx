/**
 * title: 基础用法
 */

import { useRafState } from 'gxyHooks';
import React, { useEffect } from 'react';

export default () => {
  const [state, setState] = useRafState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => {
      setState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div>
      <p>调整窗口大小看一下</p>
      当前值: {JSON.stringify(state)}
    </div>
  );
};
