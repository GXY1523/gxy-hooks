import React from 'react';
import { useResetState } from 'gxyHooks';

interface People {
  name: string;
  job: string;
}

export default () => {
  const [state, setState, resetState] = useResetState<People>({ name: 'qwe', job: 'student' });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => setState({ name: 'q', job: 't' })} style={{ marginRight: '16px' }}>
          set
        </button>
        <button onClick={resetState}>reset</button>
      </div>
    </div>
  );
};
