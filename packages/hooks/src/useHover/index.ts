import useBoolean from "../useBoolean";
import useEventListener from "../useEventListener";
import type { BasicTarget } from '../utils/domTarget';

export interface Options {
  onEnter?: () => void; 
  onLeave?: () => void; 
  onChange?: (isHover: boolean) => void; 
}
// const isHovering = useHover(target,{onEnter,onLeave,onChange});

export default (target: BasicTarget, options?: Options): boolean => {
  const [state, {setTrue, setFalse}] = useBoolean(false);
  const {onEnter, onLeave, onChange} = options || {};
  
  // mouseenter
  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
      onChange?.(true)
    },
    {
      target
    }
  )

  // mouseleave
  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
      onChange?.(false)
    },
    {
      target
    }
  )

  return state;
}