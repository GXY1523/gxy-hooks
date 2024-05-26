import React, { useEffect } from 'react';
import { useDocumentVisibility } from 'gxyHooks';

export default () => {
  const documentVisible = useDocumentVisibility();
  useEffect(() => {
    console.log(`当前页面是否可见：${documentVisible}`);
  }, [documentVisible]);

  return <div>当前页面是否可见：{documentVisible}</div>;
};
