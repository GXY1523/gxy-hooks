import { useSet } from 'gxyHooks';
import React from 'react';

export default () => {
  const [setval, { add, remove, reset }] = useSet(['q1', 'q2']);

  return (
    <>
      <div>
        <button onClick={() => add(String(Date.now()))} style={{ marginRight: '10px' }}>
          添加
        </button>

        <button
          onClick={() => remove('q2')}
          disabled={!setval.has('q2')}
          style={{ marginRight: '10px' }}
        >
          移除
        </button>

        <button onClick={() => reset()} style={{ marginRight: '10px' }}>
          重置
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <pre>{JSON.stringify(Array.from(setval), null, 2)}</pre>
      </div>
    </>
  );
};
