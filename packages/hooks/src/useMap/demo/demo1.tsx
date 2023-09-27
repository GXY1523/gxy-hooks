import React from 'react';
import { useMap } from 'encodeHooks';

export default () => {
  const [map, {set, setNew, remove, reset,get}] = useMap<string, string | number>(
    [
      ['q1','qqq'],
      ['q2','www']
    ]
  )

  return (
    <>
      <div>
        <button 
          onClick={() => set(String(Date.now()), new Date().toJSON())}
          style={{marginRight: '10px'}}
        >添加</button>

        <button 
          onClick={() => setNew([['q3','eee']])}
          style={{marginRight: '10px'}}
        >新map</button>
        <button 
          onClick={() => remove('q2')}
          disabled = {!get('q2')}
          style={{marginRight: '10px'}}
        >移除</button>
        <button 
          onClick={() => reset()}
          style={{marginRight: '10px'}}
        >重置</button>
        
      </div>
      <div style={{marginTop: '10px'}}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </>
  )
};
