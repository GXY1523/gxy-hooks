import { useState } from 'react';
import isBrowser from '../utils/isBrowser';
import useEventListener from '../useEventListener';

type visibleState = 'visible' | 'hidden' | 'prerender' | undefined;
const getVisible = () => {
  if (!isBrowser) return 'visible';
  return document.visibilityState;
};

export default function useDocumentVisibility(): visibleState {
  const [documentVisibility, setDocumentVisibility] = useState(() => getVisible());

  useEventListener(
    'visibilityState', //文档可见性状态发生变化时触发回调函数
    () => {
      setDocumentVisibility(getVisible());
    },
    {
      target: () => document, //将事件监听器绑定到 document 对象上
    },
  );
  return documentVisibility;
}
