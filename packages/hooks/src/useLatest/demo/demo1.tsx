/**
 * title: 基础用法
 * desc: useLatest 返回的永远是最新值
 */

import React, { useState, useEffect } from 'react';
import { useLatest } from 'gxyHooks';

export default () => {
  const [num, setNum] = useState(1);
  const latestNumRef = useLatest(num);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum(latestNumRef.current + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <p>num:{num}</p>;
};
