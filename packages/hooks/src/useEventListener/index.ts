import useLatest from '../useLatest';
import { BasicTarget, getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type noop = (...p: any) => void;
// 指定事件监听器的目标元素
export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Option<T extends Target = Target> = {
  target?: T;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  option?: Option<HTMLElement>,
): void;

function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  option?: Option<Element>,
): void;

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  option?: Option<Window>,
): void;

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  option?: Option<Document>,
): void;

function useEventListener(eventName: string, handler: noop, option: Option): void;

function useEventListener(eventName: string, handler: noop, option: Option = {}) {
  const handlerRef = useLatest(handler);

  useEffectWithTarget(
    () => {
      // 获取目标元素
      const targetElement = getTargetElement(option.target, window);
      if (!targetElement?.addEventListener) {
        return;
      }
      const eventListener = (event: Event) => {
        return handlerRef.current(event);
      };
      targetElement.addEventListener(eventName, eventListener, {
        capture: option.capture,
        once: option.once,
        passive: option.passive,
      });

      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: option.capture, //是否在捕获阶段移除监听器
          // 确保组件卸载时，相关的事件监听器被清理，避免可能的内存泄漏
        });
      };
    },
    [eventName, option.capture, option.once, option.passive],
    option.target,
  );
}

export default useEventListener;
