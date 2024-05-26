import { useEffect } from 'react';
import createUpdateEffect from '../createUpdateEffect';

// 忽略首次执行，其余跟useEffect一样
export default createUpdateEffect(useEffect);
