import {useMutationObserver} from 'encodeHooks';
import React, {useRef, useState} from 'react';

 const App: React.FC = () => {
  const [width,setWidth] = useState(220);
  const [num,setNum] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null)

  useMutationObserver(
    (mutationList) => {
      mutationList.forEach(() => setNum((c) => c + 1))
    },
    elementRef,
    {attributes: true}
  )
  return (
    <div>
      <div 
        ref={elementRef}
        style={{width, padding: 10, border: '1px solid #efefef', marginBottom: 10}}
       >
        当前宽度：{width}
      </div>
      <button onClick={() => setWidth((c) => c + 20)}>div宽度增加</button>
      <p>计数： {num}</p>
    </div>
  )
}

export default App;