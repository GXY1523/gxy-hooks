import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

// 创建/更新效果
export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    // 处理react 刷新功能(react-refresh)
    // 组件卸载时， isMounted.current = false;
    hook(() => {
      return () => {
        isMounted.current = false;
      }
    },[]);

    hook(() => {
      if(!isMounted.current) {
        isMounted.current = true
      }else{
        return effect()
      }
    }, deps)
  }

export default createUpdateEffect;
