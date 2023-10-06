import {useMount, useBoolean} from 'encodeHooks';
import React from 'react';
import { message } from 'antd';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  })
  return <div>gxy-hooks</div>
}

export default () => {
  const [state,{toggle}] = useBoolean(false);

  return (
    <div>
      <button onClick={toggle}> 
        {state ? 'unmount' : 'mount'} 
      </button>
      {state && <MyComponent/>}
    </div>
  )
}