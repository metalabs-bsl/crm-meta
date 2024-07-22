import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, delay: number): [string, string] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prevValue = useRef<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      prevValue.current = debouncedValue;
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return [debouncedValue, prevValue.current];
};
