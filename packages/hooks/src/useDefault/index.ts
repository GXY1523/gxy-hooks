import { useState } from 'react';

const useDefault = <T>(defaultValue: T, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T | undefined | null>(initialValue);

  if (value === null || value === undefined) {
    return [defaultValue, setValue] as const;
  }

  return [value, setValue] as const;
};

export default useDefault;
