

// useMutationObserver(
//   callback: MutationCallback,
//   target: Target,
//   options?: MutationObserverInit,

import useLatest from "../useLatest";
import { BasicTarget, getTargetElement } from "../utils/domTarget";
import useDeepCompareEffectWithTarget from "../utils/useDeepCompareEffectWithTarget";

// );
const useMutationObserver = (
  callback: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = {}
): void => {
  const callbackRef = useLatest(callback);
  useDeepCompareEffectWithTarget(
    () => {
      const element = getTargetElement(target);
      if(!element){
        return;
      }
      const oberver = new MutationObserver(callbackRef.current)

      // @ts-ignore
      oberver.observe(element, options);
      return () => {
        oberver?.disconnect();
      }
    },
    [options],
    target
  )
}

export default useMutationObserver;