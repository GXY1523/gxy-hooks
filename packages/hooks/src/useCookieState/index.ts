import Cookies from 'js-cookie';
import { useState } from 'react';
import { isFunction, isString } from '../utils';
import useMemoizedFn from '../useMemoizedFn';

export type State = string | undefined;
export interface Option extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

export default function useCookieState(cookieKey: string, option: Option = {}) {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey);
    if (isString(cookieValue)) return cookieValue;
    if (isFunction(option.defaultValue)) return option.defaultValue();
    return option.defaultValue;
  });

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      const { defaultValue, ...restOptions } = { ...option, ...newOptions };
      const value = isFunction(newValue) ? newValue(state) : newValue;

      setState(value);

      if (value === undefined) {
        Cookies.remove(cookieKey);
      } else {
        Cookies.set(cookieKey, value, restOptions);
      }
    },
  );

  return [state, updateState] as const;
}
