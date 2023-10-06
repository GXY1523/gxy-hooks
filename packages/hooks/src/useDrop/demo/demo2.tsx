/**
 * title: 自定义拖拽图像
 * desc: 自定义拖拽过程中跟随鼠标指针的图像。
 */

import React, {useRef} from 'react'; 
import {useDrag} from 'encodeHooks'

const COMMON_STYLE: React.CSSProperties = {
  border: '1px solid #efefef',
  height: '50px',
  lineHeight: '50px',
  padding: '10px',
  textAlign: 'center',
  marginRight: '10'
}

export default () => {
  const dragRef = useRef(null);
  useDrag('', dragRef, {
    dragImage: {
      image: '/avatar.svg'
    }
  })

  return (
    <div ref={dragRef} style={{display: 'flex'}}>
      <img src="/avatar.png" style={COMMON_STYLE} />
      <div style={COMMON_STYLE}>drag me</div>
    </div>
  )
}