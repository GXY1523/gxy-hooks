import useLatest from '../useLatest';
import { getTargetElement, type BasicTarget } from '../utils/domTarget';
import {useRef} from 'react';
import useEffectWithTarget from '../utils/useEffectWithTarget';
import { every } from 'lodash-es';

// useDrop<T>(
//   target: (() => Element) | Element | MutableRefObject<Element>,
//   options?: DropOptions
// );

export interface Options {
  onFiles?: (files: File[], event?: React.DragEvent) => void;
  onUri?: (url: string, event?: React.DragEvent) => void;
  onDom?: (content: any, event?: React.DragEvent) => void;
  // ClipboardEvent 剪切板事件
  onText?: (text: string, event?: React.ClipboardEvent) => void;
  onDragEnter?: (event?: React.DragEvent) => void;
  onDragOver?: (event?: React.DragEvent) => void;
  onDragLeave?: (event?: React.DragEvent) => void;
  onDrop?: (event?: React.DragEvent) => void;
  onPaste?: (event?: React.ClipboardEvent) => void;
}

const useDrop = (target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);

  const dragEnterTarget = useRef<any>();
  useEffectWithTarget(
    () => {
      const targetEle = getTargetElement(target);
      if(!targetEle?.addEventListener){
        return
      }

      const onData = (
        dataTransfer: DataTransfer,
        event: React.DragEvent | React.ClipboardEvent
      ) => {
        const uri = dataTransfer.getData('text/uri-list');
        const dom = dataTransfer.getData('custom');

        if(uri && optionsRef.current.onUri) {
          optionsRef.current.onUri(uri, event as React.DragEvent);
          return;
        }

        if(dom && optionsRef.current.onDom) {
          let data = dom;
          try {
            data = JSON.parse(dom);
          }catch (e) {
            data = dom;
          }
          optionsRef.current.onDom(data, event as React.DragEvent);
          return;
        }

        if(dataTransfer.files && dataTransfer.files.length && optionsRef.current.onFiles) {
          optionsRef.current.onFiles(Array.from(dataTransfer.files), event as React.DragEvent);
          return;
        }

        if(dataTransfer.items && dataTransfer.items.length && optionsRef.current.onText) {
          // 获取第一个数据项的文本内容
          dataTransfer.items[0].getAsString((text) => {
            optionsRef.current.onText!(text, event as React.ClipboardEvent);
          })
        }
      }

      const onDragEnter = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        dragEnterTarget.current = event.target;
        optionsRef.current.onDragEnter?.(event);
      }

      const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        optionsRef.current.onDragOver?.(event);
      }

      const onDragLeave = (event: React.DragEvent) => {
        if(event.target === dragEnterTarget.current) {
          optionsRef.current.onDragLeave?.(event);
        }
      }

      const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
        onData(event.dataTransfer, event);
        optionsRef.current.onDrop?.(event);
      }

      const onPaste = (event: React.ClipboardEvent) => {
        onData(event.clipboardData, event);
        optionsRef.current.onPaste?.(event);
      }

      targetEle.addEventListener('dragenter', onDragEnter as any);
      targetEle.addEventListener('dragover', onDragOver as any);
      targetEle.addEventListener('dragleave', onDragLeave as any);
      targetEle.addEventListener('drop', onDrop as any);
      targetEle.addEventListener('paste', onPaste as any);

      return () => {
        targetEle.removeEventListener('dragenter', onDragEnter as any);
        targetEle.removeEventListener('dragover', onDragOver as any);
        targetEle.removeEventListener('dragleave', onDragLeave as any);
        targetEle.removeEventListener('drop', onDrop as any);
        targetEle.removeEventListener('paste', onPaste as any);
      }
    },
    [],
    target
  )
}
export default useDrop;