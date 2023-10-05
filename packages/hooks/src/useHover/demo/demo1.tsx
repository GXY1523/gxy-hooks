import React, {useRef} from 'react';
import {useHover} from 'encodeHooks'

export default () => {
  const ref = useRef(null);
  const isHover = useHover(ref);

  return <div ref={ref}> {isHover ? 'hover' : 'leave hover'}</div>
}