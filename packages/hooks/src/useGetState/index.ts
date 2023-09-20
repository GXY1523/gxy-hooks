import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

type GetStateAction<S> = () => S;

function useGetState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>]; 
// 返回值是一个数组，包含三个元素： 当前状态值S,一个更新状态的函数，获取当前状态的函数

// 无参
function useGetState<S = undefined>(): [
  S | undefined, 
  Dispatch<SetStateAction<S | undefined>>, 
  GetStateAction<S | undefined>
];

function useGetState<S>(initialState?: S) {
  const [state,setState] = useState(initialState)
  const stateRef = useRef(state)
  stateRef.current = state
  const getState = useCallback(() => stateRef.current,[])
  return [state, setState, getState]
}

export default useGetState;
