import { useRef, useEffect } from 'react';
import isBrowser from '../utils/isBrowser';
import useUnmount from '../useUnmount';

export interface Option {
  restorePreviousTitle?: boolean;
}

const defaultOption: Option = {
  restorePreviousTitle: false,
};

export default function useTitle(title: string, option: Option = defaultOption) {
  const titleRef = useRef(isBrowser ? document.title : '');
  useEffect(() => {
    document.title = title;
  }, [title]);

  useUnmount(() => {
    if (option.restorePreviousTitle) document.title = titleRef.current;
  });
}
