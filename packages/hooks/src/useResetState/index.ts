import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMemoizedFn from '../useMemoizedFn';

type ResetState = () => void;

const useResetState = <S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const [state, setState] = useState(initial);
  const resetState = useMemoizedFn(() => {
    setState(initial);
  });

  return [state, setState, resetState];
};

export default useResetState;
