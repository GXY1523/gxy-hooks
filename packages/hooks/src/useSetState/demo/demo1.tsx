/**
 * title: 基础用法
 * desc: 自动合并对象。
 */

import { useSetState } from 'gxyHooks';
import React from 'react';

interface State {
  head: string;
  [key: string]: any;
}

export default () => {
  const [state, setState] = useSetState<State>({
    head: '',
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ head: 'hello' })}>
          set head
        </button>
        <button
          type="button"
          onClick={() => setState({ content: 'world' })}
          style={{ margin: '0 8px' }}
        >
          set content
        </button>
      </p>
    </div>
  );
};
