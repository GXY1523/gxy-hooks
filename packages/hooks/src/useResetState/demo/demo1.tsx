import React from 'react';
import { useResetState } from 'encodeHooks';
import { set } from 'js-cookie';

interface People {
  name: string;
  job: string;
}

export default () => {
  const [state, setState, resetState] = useResetState<People>({name: 'qwe', job: 'student'});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div style={{marginTop:'10px'}}>
        <button 
          onClick={() => setState({name: 'q', job: 't'})}
          style={{marginRight:'10px'}}
        >
          set
        </button>
        <button 
          onClick={resetState}
        >
          reset
        </button>
      </div>
    </div>
  );
};
