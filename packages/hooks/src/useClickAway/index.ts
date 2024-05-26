import useLatest from '../useLatest';
import { BasicTarget, getTargetElement } from '../utils/domTarget';
import getDocumentOrShadow from '../utils/getDocumentOrShadow';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type DocumentEventKey = keyof DocumentEventMap;

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: DocumentEventKey | DocumentEventKey[] = 'click',
) {
  const clickRef = useLatest(onClickAway);
  useEffectWithTarget(
    () => {
      const handler = (event: any) => {
        const targets = Array.isArray(target) ? target : [target];
        if (
          targets.some((item) => {
            const targetEle = getTargetElement(item);
            // @ts-ignore
            return !targetEle || targetEle.contains(event.target);
          })
        ) {
          return;
        }
        clickRef.current(event);
      };

      // 获取 target 的文档对象或阴影根节点对象
      const documentOrShadow = getDocumentOrShadow(target);
      const eventNames = Array.isArray(eventName) ? eventName : [eventName];
      eventNames.forEach((event) => documentOrShadow.addEventListener(event, handler));
      return () => {
        eventNames.forEach((event) => documentOrShadow.removeEventListener(event, handler));
      };
    },
    Array.isArray(eventName) ? eventName : [eventName],
    target,
  );
}
