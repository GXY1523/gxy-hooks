import { useState } from 'react';
import { isFunction, isUndef } from '../utils';
import useUpdateEffect from '../useUpdateEffect';
import useMemoizedFn from '../useMemoizedFn';

export type SetState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(key: string, options: Options<T> = {}) {
    let strage: Storage | undefined;
    // 用于处理错误信息，
    // 如果没有传入该函数，则默认使用 console.error 函数
    const {
      onError = (e) => {
        console.error(e);
      },
    } = options;

    // 获取存储对象，并将其赋值给 storage 变量
    try {
      strage = getStorage();
    } catch (err) {
      onError(err);
    }

    const serializer = (value: T) => {
      if (options.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    };
    const deserializer = (value: string): T => {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      return JSON.parse(value);
    };

    // 获取存储的值
    function getStorageValue() {
      try {
        const raw = strage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        onError(e);
      }
      if (isFunction(options.defaultValue)) {
        return options.defaultValue();
      }
      return options.defaultValue;
    }

    const [state, setState] = useState(getStorageValue);
    useUpdateEffect(() => {
      setState(getStorageValue());
    }, [key]);

    // 更新状态并将其存储到本地存储中
    const updateState = (value?: SetState<T>) => {
      const currentState = isFunction(value) ? value(state) : value;
      setState(currentState);
      if (isUndef(currentState)) {
        strage?.removeItem(key);
      } else {
        try {
          strage?.setItem(key, serializer(currentState));
        } catch (e) {
          console.error(e);
        }
      }
    };

    // 第一个 为状态 state，第二个为经过优化的更新状态函数
    return [state, useMemoizedFn(updateState)] as const;
  }

  return useStorageState;
}
