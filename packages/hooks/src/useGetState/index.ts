import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

type GetStateAction<S> = () => S;

function useGetState<S>(
  initState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];

function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];

function useGetState<S>(initState?: S) {
  const [state, setState] = useState(initState);
  const stateRef = useRef(state);
  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useGetState;
