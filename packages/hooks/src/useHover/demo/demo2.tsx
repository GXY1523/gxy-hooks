import React, {useRef} from 'react';
import {useHover} from 'encodeHooks'

export default () => {
  const isHover = useHover(() => document.getElementById('box'),{
    onEnter: () => {console.log('onEnter')},
    onLeave: () => {console.log('onLeave')},
    onChange: isHover => {console.log('onChange', isHover)},
  });

  return <div id='box'> {isHover ? 'hover' : 'leave hover'}</div>
}