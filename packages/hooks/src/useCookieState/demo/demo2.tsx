/**
 * title: setState 可以接收函数
 * desc: useCookieState 的 setState 可以接收 function updater，就像 useState 那样。
 */

import React from 'react';
import { useCookieState } from 'encodeHooks';

export default function App() {
  const [num,setNum]=useCookieState('useCookieState2',{
    defaultValue:'0'
  })
  return (
    <>
      <p>{num}</p>
      <div>
        <button 
          style={{marginRight:10}}
          onClick={()=>setNum(item=>String(Number(item)+1))}  
        > + 1 </button>
        <button 
          style={{marginRight:10}}
          onClick={()=>setNum(item=>String(Number(item)-1))}  
        > - 1 </button>
        <button 
          onClick={()=>setNum('0')}  
        > reset </button>
      </div>
    </>
  )
}
