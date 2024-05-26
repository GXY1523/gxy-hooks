/**
 * title: 自定义 shouldUpdate 函数
 * desc: 只有 shouldUpdate function 返回 true 时，才会记录值的变化。
 */

import { usePrevious } from 'gxyHooks';
import React, { useState } from 'react';

interface Person {
  name: string;
  job: string;
}

const nameShouleUpdate = (pre: Person | undefined, next: Person) => {
  if (!pre) return true;
  if (pre.name !== next.name) return true;
  return false;
};

const jobShouleUpdate = (pre: Person | undefined, next: Person) => {
  if (!pre) return true;
  if (pre.job !== next.job) return true;
  return false;
};

export default () => {
  const [person, setPerson] = useState({ name: 'qwe', job: 'student' });
  const [nameInput, setNameInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const preName = usePrevious(person, nameShouleUpdate);
  const preJob = usePrevious(person, jobShouleUpdate);

  return (
    <>
      <div style={{ border: '1px solid #efefef', paddingLeft: '10px' }}>
        <p>current name : {person.name}</p>
        <p>current job : {person.job}</p>
      </div>

      <div style={{ marginTop: '10px', border: '1px solid #efefef', paddingLeft: '10px' }}>
        <p>previous name : {(preName || {}).name}</p>
        <p>previous job : {(preJob || {}).job}</p>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div>
          <input
            style={{ width: 220, marginRight: '10px' }}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="请输入 名字"
          />
          <button
            onClick={() => {
              setPerson((c) => ({ ...c, name: nameInput }));
            }}
          >
            更新名字
          </button>
        </div>

        <div style={{ marginTop: '10px' }}>
          <input
            style={{ width: 220, marginRight: '10px' }}
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            placeholder="请输入 职业"
          />
          <button
            onClick={() => {
              setPerson((c) => ({ ...c, job: jobInput }));
            }}
          >
            更新职业
          </button>
        </div>
      </div>
    </>
  );
};
