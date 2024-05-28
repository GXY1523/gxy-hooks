/**
 * title: 基础用法
 * desc: 用于在值为 undefined 时返回一个默认值
 */

import React from 'react';
import { useDefault } from 'gxyHooks';

export default () => {
  const initialUser = { name: 'Tom' };
  const defaultUser = { name: 'Json' };
  const [user, setUser] = useDefault(defaultUser, initialUser);

  return (
    <div>
      <div>User: {user.name}</div>
      <input onChange={(e) => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)} style={{ marginLeft: '16px' }}>
        设为 null
      </button>
    </div>
  );
};
