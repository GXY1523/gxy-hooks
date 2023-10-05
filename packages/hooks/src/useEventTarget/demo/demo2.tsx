/**
 * title: 自定义转换函数
 * desc: 只能输入字母的 input 组件
 */

import {useEventTarget} from 'encodeHooks';
import React from 'react'

export default () => {
  const [value, {reset, onChange}] = useEventTarget({initValue:'', transformer: (val: string) => val.replace(/[^a-zA-Z]/g,'')});

  return (
    <div>
      <input 
        value={value} 
        onChange={onChange}
        placeholder='请输入'
        style={{width: 220, marginRight: '10px'}} />
      <button onClick={reset}>reset</button>
    </div>
  )
}